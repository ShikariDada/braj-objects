"""Braj Objects — headless product renderer (Blender 5.2, Cycles).

Builds the collectible magnet as authored geometry and renders the
campaign plates the site actually displays:

  FACE_ART / FACE_COATING / BODY / BACK_PLATE / MAGNET mesh convention,
  +Y up, +Z front, real-world scale in meters (70 x 70 x 5 mm concept).

Renders per object (front 3/4 hero, straight front, macro edge, back):
  blender/blender_out/<slug>_{hero,front,edge,back}.png

Plus one shared environment plate:
  blender/blender_out/braj-dusk.png  (Yamuna dusk campaign plate)

Usage:
  blender --background --python blender/render_products.py -- --out blender/blender_out
"""
import argparse
import math
import os as _os
import sys
import tempfile

import bpy
import mathutils

BLENDER = "C:/Program Files/Blender Foundation/Blender 5.2/blender.exe"

# ---------------------------------------------------------------- palette
PAPER = (0.905, 0.875, 0.800, 1.0)
INK = (0.094, 0.082, 0.070, 1.0)
SAND = (0.607, 0.266, 0.207, 1.0)
SAND_DEEP = (0.431, 0.184, 0.149, 1.0)
YAMUNA = (0.094, 0.243, 0.239, 1.0)
YAMUNA_SOFT = (0.192, 0.329, 0.322, 1.0)
BRASS = (0.541, 0.439, 0.294, 1.0)
BRASS_LIT = (0.788, 0.608, 0.373, 1.0)
STEEL = (0.235, 0.235, 0.251, 1.0)

W, H, D = 0.070, 0.070, 0.005  # concept proportion, meters

OBJECTS = [
    # slug,            face base,  motif
    ("krishna-janmabhoomi", "paper", "arch"),
    ("vishram-ghat",        "paper", "ghat"),
    ("dwarkadhish",         "paper", "tower"),
    ("govardhan",           "paper", "hill"),
    ("kusum-sarovar",       "paper", "mirror"),
    ("braj-84-kos",         "paper", "circuit"),
    ("premanand-ji",        "paper", "mala"),
    ("sharnanand-ji",       "paper", "mor"),
]


# ---------------------------------------------------------------- helpers
def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for coll in (bpy.data.meshes, bpy.data.materials, bpy.data.images,
                 bpy.data.lights, bpy.data.cameras, bpy.data.worlds):
        for x in list(coll):
            coll.remove(x)


def mat(name, base, roughness=0.5, metallic=0.0, clearcoat=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = base
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    if clearcoat and "Coat Weight" in bsdf.inputs:
        bsdf.inputs["Coat Weight"].default_value = clearcoat
        bsdf.inputs["Coat Roughness"].default_value = 0.35
    return m


def face_image(slug, motif):
    """Paint the printed face at 2048px with the place-study artwork.

    Span-based painter: every primitive writes whole horizontal row spans
    into a bytearray (numpy feeds img.pixels). 2048px + Cycles mipmaps kill
    the 1px dotted-column moire the 1400px per-pixel painter produced.
    Design grid: 800x800, y=0 is the design TOP (Y() flips to row space).
    """
    import numpy as np

    size = 2048
    u = size / 800.0
    arr = np.zeros((size, size, 4), dtype=np.uint8)

    def rgba(c):
        # the painter always writes fully-opaque, pre-blended colours
        return np.array((int(c[0] * 255), int(c[1] * 255), int(c[2] * 255), 255), dtype=np.uint8)

    def fill_row(y, x0, x1, c8):
        if y < 0 or y >= size:
            return
        a, b = sorted((int(x0), int(x1)))
        a = max(0, a)
        b = min(size, b)
        if b > a:
            arr[y, a:b] = c8

    def rect_px(x0, y0, x1, y1, c):
        c8 = rgba(c)
        a, b = sorted((int(x0), int(x1)))
        d, e = sorted((int(y0), int(y1)))
        arr[max(0, d):min(size, e), max(0, a):min(size, b)] = c8

    def disc_px(cx, cy, r, c):
        c8 = rgba(c)
        for y in range(int(cy - r), int(cy + r) + 1):
            if 0 <= y < size:
                dy = y - cy
                half = math.sqrt(max(r * r - dy * dy, 0.0))
                a, b = int(cx - half), int(cx + half) + 1
                a = max(0, a)
                b = min(size, b)
                if b > a:
                    arr[y, a:b] = c8

    def X(v):
        return v * u

    def Y(v):
        return (800 - v) * u

    def mix(c1, c2, t):
        return tuple(c1[i] * (1 - t) + c2[i] * t for i in range(3)) + (1.0,)

    # pre-blended "overlays" (old code wrote alpha pixels Cycles ignored,
    # which shifted every translucent tone toward mud)
    GLOW_ON_SAND = mix(BRASS, SAND, 0.42)          # lamp glow on sandstone
    HALO_ON_INK = mix(SAND, (0.13, 0.115, 0.10, 1.0), 0.62)  # dusk halo on ink
    bg = PAPER

    if motif == "arch":
        # Sandstone field; three nested arch bands, crown up, feet at the
        # courtyard steps. Row spans (not pixel dots) — clean AA at any size.
        rect_px(0, 0, size, size, SAND)
        for cx, wdt, col, th in ((400, 560, SAND_DEEP, 46), (400, 400, PAPER, 36), (400, 240, INK, 14)):
            th_half = th * u / 2
            for t in range(0, 560, 1):
                yv = 130 + t
                half = (wdt / 2) * (1.0 - 0.52 * (t / 560) ** 1.4)
                yc = Y(yv)
                for k in (-1, 1):
                    xc = X(cx + k * half)
                    rect_px(xc - th_half, yc - 1, xc + th_half, yc + 1, col)
        # courtyard lamp: brass glow disc, diya flame bar seated inside
        disc_px(X(400), Y(330), 96 * u, GLOW_ON_SAND)
        disc_px(X(400), Y(330), 64 * u, SAND_DEEP)
        rect_px(X(356), Y(338), X(444), Y(322), BRASS_LIT)
        # courtyard steps: three bands at the bottom of the design
        rect_px(X(100), Y(680), X(700), Y(660), INK)
        rect_px(X(150), Y(716), X(650), Y(700), mix(INK, SAND, 0.25))
        rect_px(X(210), Y(750), X(590), Y(738), mix(INK, SAND, 0.5))
    elif motif == "ghat":
        # paper SKY (0-280) / five ghat STEP bands (280-556) / Yamuna WATER
        # (556-800) with lamp + reflection + sun disc.
        rect_px(0, 0, size, size, bg)
        bands = [SAND_DEEP, SAND, INK, SAND_DEEP, SAND]
        for i, c in enumerate(bands):
            rect_px(0, Y(335 + i * 55), size, Y(280 + i * 55), c)
        rect_px(0, Y(800), size, Y(556), YAMUNA)
        disc_px(X(618), Y(140), 42 * u, SAND)
        for j, yy in enumerate((600, 638, 676, 714, 752)):
            rect_px(X(60 + j * 37), Y(yy + 5), X(240 + j * 25), Y(yy), YAMUNA_SOFT)
        disc_px(X(400), Y(652), 46 * u, mix(BRASS, YAMUNA, 0.55))
        disc_px(X(400), Y(652), 16 * u, BRASS_LIT)
        rect_px(X(388), Y(768), X(412), Y(676), mix(BRASS_LIT, YAMUNA, 0.45))
    elif motif == "tower":
        # Deep ink base; tower tiers stack from the plinth (design y 620) UP
        # to the crown (design y 200), finial + amalaka above, shrines flank.
        rect_px(0, 0, size, size, (0.13, 0.115, 0.10, 1.0))
        disc_px(X(400), Y(360), 240 * u, HALO_ON_INK)
        yv = 200
        for wdt, c in ((146, SAND_DEEP), (190, SAND), (238, SAND_DEEP), (288, SAND), (340, SAND_DEEP)):
            rect_px(X(400 - wdt / 2), Y(yv + 84), X(400 + wdt / 2), Y(yv), c)
            yv += 84
        disc_px(X(400), Y(180), 80 * u, BRASS)
        rect_px(X(393), Y(170), X(407), Y(112), SAND_DEEP)
        for dy in range(0, 70):
            wdt = 32 * (1 - dy / 78)
            rect_px(X(400 - wdt), Y(112 - dy), X(400 + wdt), Y(111 - dy), SAND_DEEP)
        rect_px(X(150), Y(330), X(246), Y(200), SAND)
        for dy in range(0, 60):
            wdt = 48 * (1 - dy / 70)
            rect_px(X(198 - wdt), Y(200 - dy), X(198 + wdt), Y(199 - dy), SAND_DEEP)
        rect_px(X(554), Y(330), X(650), Y(200), SAND)
        for dy in range(0, 60):
            wdt = 48 * (1 - dy / 70)
            rect_px(X(602 - wdt), Y(200 - dy), X(602 + wdt), Y(199 - dy), SAND_DEEP)
        rect_px(X(110), Y(646), X(690), Y(620), PAPER)
    elif motif == "hill":
        # paper sky, sandstone sun, Yamuna hill-field with soft ridge, dotted
        # parikrama circuit, ink plinth. The hill is a vectorized numpy mask
        # (per-column ridge sinusoid) — zero per-pixel Python cost.
        rect_px(0, 0, size, size, bg)
        disc_px(X(560), Y(180), 70 * u, SAND)
        xs = np.arange(size, dtype=np.float64)
        xd = xs / u
        edge_design = 430 - 60 * np.sin(xd / 800 * 6.0) - 30 * np.sin(xd / 800 * 17.0)
        edge_rows = (800 - edge_design) * u
        ys = np.arange(size, dtype=np.float64)[:, None]
        hill = (ys >= edge_rows[None, :]) & (ys < Y(716))
        soft = hill & (ys < Y(540))
        arr[soft] = rgba(YAMUNA_SOFT)
        arr[hill & ~soft] = rgba(YAMUNA)
        # dotted parikrama ellipse
        for t in range(0, 3600, 3):
            a = math.radians(t / 10)
            xc = X(400 + 262 * math.cos(a))
            yc = Y(600 + 92 * math.sin(a))
            rect_px(xc - 2, yc - 2, xc + 2, yc + 2, PAPER)
        rect_px(0, 0, size, Y(716), INK)
        # ridge crest line over the field
        for x in range(0, size, 2):
            edge_y = int((800 - (540 - 50 * math.sin(xd[x] / 800 * 5.0) - 24 * math.sin(xd[x] / 800 * 13.0))) * u)
            arr[edge_y:edge_y + 3, x:x + 2] = rgba(SAND_DEEP)
    elif motif == "mirror":
        # paper sky, pavilion above, Yamuna mirror below, brass lamp glow.
        rect_px(0, 0, size, size, bg)
        rect_px(X(230), Y(320), X(570), Y(300), INK)
        for cx in (258, 342, 426, 510):
            rect_px(X(cx), Y(300), X(cx + 20), Y(196), SAND_DEEP)
        rect_px(X(232), Y(218), X(568), Y(196), SAND_DEEP)
        for dy in range(0, 100):
            wdt = 100 * (1 - dy / 112)
            rect_px(X(400 - wdt), Y(196 - dy), X(400 + wdt), Y(195 - dy), SAND)
        rect_px(X(394), Y(120), X(406), Y(84), SAND)
        disc_px(X(400), Y(78), 10 * u, SAND)
        rect_px(0, Y(414), size, Y(402), INK)
        rect_px(0, Y(402), size, size, YAMUNA)
        rect_px(X(230), Y(486), X(570), Y(464), YAMUNA_SOFT)
        for cx in (258, 342, 426, 510):
            rect_px(X(cx), Y(464), X(cx + 20), Y(530), YAMUNA_SOFT)
        for dy in range(0, 60):
            wdt = 100 * (1 - dy / 80)
            rect_px(X(400 - wdt), Y(530 + dy * 0.6), X(400 + wdt), Y(529 + dy * 0.6), mix(BRASS, YAMUNA, 0.35))
        for j, yy in enumerate((620, 680, 740)):
            rect_px(X(120 + j * 40), Y(yy + 4), X(360 + j * 40), Y(yy), YAMUNA_SOFT)
    elif motif == "circuit":
        # Full-bleed ink field with the 84-kos diagram in paper + brass.
        rect_px(0, 0, size, size, (0.13, 0.115, 0.10, 1.0))
        for r in (330, 262, 180):
            for t in range(0, 7200, 2):
                a = math.radians(t / 20)
                xc = X(400 + r * math.cos(a))
                yc = Y(400 + r * math.sin(a))
                rect_px(xc - 1, yc - 1, xc + 1, yc + 1, PAPER)
        for i in range(12):
            a = math.radians(i * 30)
            sx, sy = 400 + 262 * math.cos(a), 400 + 262 * math.sin(a)
            disc_px(X(sx), Y(sy), (22 if i == 9 else 11) * u,
                    SAND if i == 9 else BRASS)
        disc_px(X(400), Y(400), 20 * u, BRASS)
        disc_px(X(400), Y(400), 7 * u, INK)
    elif motif == "mala":
        # Devotional study, not a portrait: tulsi-mala circle around a single
        # lamp on a deep Yamuna field. Symbolic geometry in the Braj palette.
        rect_px(0, 0, size, size, YAMUNA)
        disc_px(X(400), Y(400), 250 * u, HALO_ON_INK)
        disc_px(X(400), Y(400), 150 * u, GLOW_ON_SAND)
        for i in range(27):
            a = math.radians(i * (360.0 / 27))
            sx, sy = 400 + 218 * math.cos(a), 400 + 218 * math.sin(a)
            disc_px(X(sx), Y(sy), 20 * u, BRASS)
            disc_px(X(sx), Y(sy), 9 * u, BRASS_LIT)
        disc_px(X(400), Y(400), 56 * u, mix(BRASS, YAMUNA, 0.35))
        disc_px(X(400), Y(400), 20 * u, BRASS_LIT)
        rect_px(X(388), Y(470), X(412), Y(400), mix(BRASS_LIT, YAMUNA, 0.35))
        rect_px(X(150), Y(700), X(650), Y(688), PAPER)
    elif motif == "mor":
        # Companion devotional study: the eye of the peacock feather as pure
        # concentric geometry on paper. No likeness, no portrait.
        rect_px(0, 0, size, size, bg)
        rect_px(X(392), Y(720), X(408), Y(120), SAND_DEEP)
        disc_px(X(400), Y(420), 210 * u, YAMUNA)
        disc_px(X(400), Y(420), 160 * u, YAMUNA_SOFT)
        disc_px(X(400), Y(420), 112 * u, SAND)
        disc_px(X(400), Y(420), 72 * u, SAND_DEEP)
        disc_px(X(400), Y(420), 40 * u, YAMUNA)
        disc_px(X(400), Y(420), 16 * u, BRASS_LIT)
        for j, yy in enumerate((180, 220, 620, 660)):
            rect_px(X(180 + j * 30), Y(yy + 4), X(620 - j * 30), Y(yy), YAMUNA_SOFT)

    # archive mark: small brass dot, bottom-right of every face — the set's
    # quiet signature (echoed by the sleeve grammar).
    disc_px(X(744), Y(744), 8 * u, BRASS)

    # print keyline at the artwork boundary
    rect_px(X(6), Y(794), X(794), Y(792), INK)
    rect_px(X(6), Y(8), X(794), Y(6), INK)
    rect_px(X(6), Y(794), X(8), Y(6), INK)
    rect_px(X(792), Y(794), X(794), Y(6), INK)

    arr_img = arr.astype(np.float32).ravel() / 255.0
    img = bpy.data.images.new(f"face_{slug}", size, size, alpha=True)
    img.pixels.foreach_set(arr_img)
    img.update()
    # Save to a real PNG file and reload — packed generated images can
    # render through a wrong (washed/pink) path in background Cycles.
    tmp = _os.path.join(tempfile.gettempdir(), f"brajface_{slug}.png")
    img.filepath_raw = tmp
    img.file_format = "PNG"
    img.save()
    img2 = bpy.data.images.load(tmp)
    try:
        img2.colorspace_settings.name = "sRGB"
    except Exception:
        pass
    img2.pack()
    bpy.data.images.remove(img)
    return img2


def build_magnet(face_img):
    """BODY with thickness along Z, printed face on +Z, magnet inset on -Z."""
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0))
    body = bpy.context.active_object
    body.name = "BODY"
    # Cube side is 1 m (verts at ±0.5): scale by full dims for 70x70x5 mm.
    body.scale = (W, H, D)
    bpy.ops.object.transform_apply(scale=True)
    # rounded edges — the tactile detail the macro shot must show
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="SELECT")
    bpy.ops.mesh.bevel(offset=0.0016, segments=3, affect="EDGES")
    bpy.ops.object.mode_set(mode="OBJECT")

    body_mat = mat("body_mat", (0.13, 0.115, 0.10, 1.0), roughness=0.55)
    back_mat = mat("back_mat", (0.09, 0.08, 0.075, 1.0), roughness=0.6)
    # Printed face: soft-matte resin with a whisper of clearcoat — the real finish.
    # The artwork is LIT (BSDF), not glowing (emission): emission washed every
    # motif out to white at poster exposure. BSDF keeps the sandstone/yamuna
    # values the face painter authored.
    face_mat = mat("face_mat", (1, 1, 1, 1.0), roughness=0.55)
    face_mat.use_nodes = True
    nodes = face_mat.node_tree.nodes
    links = face_mat.node_tree.links
    bsdf = nodes["Principled BSDF"]
    tex = nodes.new("ShaderNodeTexImage")
    tex.image = face_img
    try:
        tex.image.colorspace_settings.name = "sRGB"
    except Exception:
        pass
    # Wire artwork into the EXISTING Principled BSDF (creating a second
    # Output node leaves it inactive — that was the white-face bug).
    links.new(tex.outputs["Color"], bsdf.inputs["Base Color"])
    out = nodes.get("Material Output") or nodes.new("ShaderNodeOutputMaterial")
    coat_mat = mat("coat_mat", (1, 1, 1, 1.0), roughness=0.45, clearcoat=0.25)
    coat_mat.blend_method = "BLEND"
    # kept for the mesh convention only — no coating plane is built anymore
    alpha_in = coat_mat.node_tree.nodes["Principled BSDF"].inputs.get("Alpha")
    if alpha_in is not None:
        alpha_in.default_value = 0.04

    body.data.materials.append(body_mat)   # slot 0: edges
    body.data.materials.append(face_mat)   # slot 1: printed +Z face
    body.data.materials.append(back_mat)   # slot 2: -Z back
    for poly in body.data.polygons:
        n = poly.normal
        if n.z > 0.5:
            poly.material_index = 1
        elif n.z < -0.5:
            poly.material_index = 2
        else:
            poly.material_index = 0
    # UV-map the +Z face so the artwork reads upright, full-bleed.
    # Bevel creates many faces; write planar UVs for every loop directly.
    # NO V-flip: the face painter stores row 0 = design BOTTOM, and Blender
    # UV V=0 samples the stored bottom row — so V rises straight with +Y.
    # (An earlier 1.0- flip, verified against degenerate rolled cameras,
    #  turned every motif upside down once the explicit look-at landed:
    #  water-at-top ghat, finial-at-bottom tower, Mathura node at bottom.)
    if not body.data.uv_layers:
        body.data.uv_layers.new(name="face_uv")
    uv_layer = body.data.uv_layers[0]
    for poly in body.data.polygons:
        for loop_idx in poly.loop_indices:
            v = body.data.vertices[body.data.loops[loop_idx].vertex_index].co
            uv_layer.data[loop_idx].uv = ((v.x + W / 2) / W, (v.y + H / 2) / H)
    # NOTE: no separate coating plane. The bevelled BODY's own clearcoat
    # response carries the finish; a transparent plane only ghosts the print
    # (pink cast seen in QA). FACE_COATING name kept for the mesh convention.

    # BACK_PLATE + MAGNET disc on -Z
    bpy.ops.mesh.primitive_cylinder_add(radius=0.011, depth=0.0012,
                                        location=(0, 0, -D / 2 - 0.0004))
    mag = bpy.context.active_object
    mag.name = "MAGNET"
    mag.data.materials.append(mat("magnet_mat", STEEL, roughness=0.35, metallic=0.85))

    bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, -D / 2 - 0.0001))
    bp = bpy.context.active_object
    bp.name = "BACK_PLATE"
    bp.scale = ((W - 0.008), (H - 0.008), 1)
    bpy.ops.object.transform_apply(scale=True)
    bp.rotation_euler = (0, 0, 0)
    bp.data.materials.append(back_mat)
    return body


def setup_lighting():
    world = bpy.data.worlds.new("studio")
    world.use_nodes = True
    # Warm grey surround — reads as a paper studio, no cold CGI cast.
    world.node_tree.nodes["Background"].inputs["Color"].default_value = (0.42, 0.40, 0.37, 1.0)
    world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.5
    bpy.context.scene.world = world

    # Paper sweep under the magnet — large enough to fill every frame so no
    # void horizon shows through.
    bpy.ops.mesh.primitive_plane_add(size=0.30, location=(0, 0, -0.004))
    floor = bpy.context.active_object
    floor.name = "STUDIO_FLOOR"
    floor.data.materials.append(mat("floor_mat", (0.925, 0.905, 0.865, 1.0), roughness=0.95))

    # Standard view transform keeps the artwork's sRGB values legible — AgX
    # (Blender default) desaturated the sandstone to washed pink. Meter the
    # key for the printed face: bright enough to read, dark enough to cast a
    # believable shadow.
    bpy.ops.object.light_add(type="AREA", location=(0.22, -0.26, 0.30))
    key = bpy.context.active_object
    key.data.energy = 2.6
    key.data.size = 0.25
    key.data.color = (1.0, 0.957, 0.878)

    bpy.ops.object.light_add(type="AREA", location=(-0.28, -0.08, 0.22))
    fill = bpy.context.active_object
    fill.data.energy = 0.7
    fill.data.size = 0.5
    fill.data.color = (0.812, 0.878, 0.855)

    bpy.ops.object.light_add(type="SUN", location=(0, -0.2, 0.6))
    rim = bpy.context.active_object
    rim.data.energy = 0.3


def camera_to(name, loc, target=(0, 0, 0), lens=85):
    bpy.ops.object.camera_add(location=loc)
    cam = bpy.context.active_object
    cam.name = name
    cam.data.lens = lens
    # Product scale is centimetres: default near clip (0.1 m) sits BEYOND the
    # front/edge cameras (~0.08-0.10 m out) — QA saw the face clipped away to
    # black bars. Pull the near plane inside the magnet's back face.
    cam.data.clip_start = 0.005
    cam.data.clip_end = 5.0
    # Point -Z at the target, then READ BACK what the camera actually faces:
    # explicit look-at (track quats degenerate on near-vertical product shots —
    # QA saw rolled black-bar frames, look-angles 50-130 deg off target).
    d = mathutils.Vector(target) - mathutils.Vector(loc)
    d.normalize()
    up = mathutils.Vector((0, 0, 1))
    if abs(d.dot(up)) > 0.999:
        up = mathutils.Vector((0, 1, 0))
    z = -d
    x = up.cross(z).normalized()
    y = z.cross(x).normalized()
    cam.matrix_world = mathutils.Matrix((
        (x.x, y.x, z.x, loc[0]),
        (x.y, y.y, z.y, loc[1]),
        (x.z, y.z, z.z, loc[2]),
        (0, 0, 0, 1),
    ))
    bpy.context.scene.camera = cam
    # QA assert: -Z must actually look at the target.
    n = cam.matrix_world.to_quaternion() @ mathutils.Vector((0, 0, -1))
    ang = n.angle(d)
    print(f"CAM {name} look-angle {math.degrees(ang):.2f} deg", flush=True)
    return cam


def render_to(path, x=1400, y=1400):
    import os as _os
    sc = bpy.context.scene
    sc.render.engine = "CYCLES"
    sc.cycles.samples = 64
    sc.cycles.use_denoising = True
    sc.cycles.device = "CPU"
    # Standard view transform keeps authored sRGB values legible on graphic
    # flat artwork — Blender's default AgX desaturated the sandstone to
    # washed pink (QA).
    sc.view_settings.view_transform = "Standard"
    sc.view_settings.look = "None"
    sc.view_settings.exposure = 0.0
    if _os.environ.get("QUICK") == "1":
        sc.cycles.samples = 24
        x, y = 700, 700
    sc.render.resolution_x = x
    sc.render.resolution_y = y
    sc.render.resolution_percentage = 100
    sc.render.film_transparent = False
    sc.render.image_settings.file_format = "PNG"
    sc.render.filepath = path
    bpy.ops.render.render(write_still=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="blender/blender_out")
    args, _ = ap.parse_known_args(sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else [])
    out = _os.path.abspath(args.out)
    _os.makedirs(out, exist_ok=True)

    only = _os.environ.get("ONLY")
    for slug, _base, motif in OBJECTS:
        if only and slug != only:
            continue
        # skip objects that already have a full set (resume-friendly)
        want = [f"{slug}_{v}.png" for v in ("hero", "front", "edge", "back")]
        if _os.environ.get("FORCE") != "1" and all(_os.path.exists(_os.path.join(out, w)) for w in want):
            print(f"SKIP {slug} (already rendered)", flush=True)
            continue
        clear_scene()
        setup_lighting()
        face = face_image(slug, motif)
        build_magnet(face)

        # Flat-lay staging: magnet lies face-up on the sweep, camera above.
        # Body is 70 mm wide; at 50 mm lens the object fills the frame only
        # at close range — earlier distances (0.13-0.18 m) left the magnet a
        # thumbnail in a white void (body scale bug + oversized floor).
        # +Y is frame-up (front camera sits on -Y): the arch crown (+Y side of
        # the face) must appear at image top, not mirrored.
        # hero 3/4 — face readable at an angle, soft shadow under the body.
        # Framed close: the object fills the frame, sweep falls off behind.
        camera_to("cam_hero", (-0.034, -0.086, 0.060), lens=50)
        render_to(_os.path.join(out, f"{slug}_hero.png"))
        # straight front — the trust shot, near top-down
        camera_to("cam_front", (0.0, -0.012, 0.095), lens=50)
        render_to(_os.path.join(out, f"{slug}_front.png"))
        # macro edge — low grazing view, thickness + bevel evidence
        camera_to("cam_edge", (-0.078, -0.032, 0.014), lens=60)
        render_to(_os.path.join(out, f"{slug}_edge.png"))
        # back — hide the floor, camera below looking up at plate + disc
        # (no coating plane exists anymore — see build_magnet note)
        bpy.data.objects["STUDIO_FLOOR"].hide_render = True
        camera_to("cam_back", (0.020, 0.120, -0.105), lens=50)
        render_to(_os.path.join(out, f"{slug}_back.png"))
        bpy.data.objects["STUDIO_FLOOR"].hide_render = False
        print(f"RENDERED {slug}", flush=True)

    # dusk campaign plate — abstract Yamuna study, no product, no temple.
    # Skipped when ONLY is set (single-object iteration).
    if not only and (_os.environ.get("FORCE") == "1" or not _os.path.exists(_os.path.join(out, "braj-dusk.png"))):
        clear_scene()
        setup_lighting()
        bpy.ops.mesh.primitive_plane_add(size=2, location=(0, 0, -0.06))
        plane = bpy.context.active_object
        plane.data.materials.append(mat("water", YAMUNA, roughness=0.25))
        for i, lx in enumerate((-0.4, -0.1, 0.2, 0.45)):
            bpy.ops.object.light_add(type="POINT", location=(lx, 0.15, 0.12 + (i % 2) * 0.05))
            lamp = bpy.context.active_object
            lamp.data.energy = 12
            lamp.data.color = (0.788, 0.608, 0.373)
        camera_to("cam_dusk", (0, 0.5, 0.28), target=(0, 0, -0.02), lens=50)
        render_to(_os.path.join(out, "braj-dusk.png"), x=1600, y=900)
        print("RENDERED braj-dusk", flush=True)
    else:
        print("SKIP braj-dusk (already rendered)", flush=True)


main()
