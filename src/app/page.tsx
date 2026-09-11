import type { Metadata } from "next";
import { HeroObject } from "@/components/home/HeroObject";
import { MacroDetail } from "@/components/home/MacroDetail";
import { ConstructionStory } from "@/components/home/ConstructionStory";
import { MagneticSnap } from "@/components/home/MagneticSnap";
import { CollectionReveal } from "@/components/home/CollectionReveal";
import { FromBraj } from "@/components/home/FromBraj";
import { PackagingStory } from "@/components/home/PackagingStory";
import { ProductProof } from "@/components/home/ProductProof";
import { PurchaseRail } from "@/components/home/PurchaseRail";

export const metadata: Metadata = {
  title: "Braj Objects — A piece of Braj, made to be kept",
  description:
    "Numbered collectible refrigerator magnets from Mathura and Braj. Object-first storytelling and an archive of eight objects.",
};

export default function HomePage() {
  return (
    <>
      <HeroObject />
      <MacroDetail />
      <ConstructionStory />
      <MagneticSnap />
      <CollectionReveal />
      <FromBraj />
      <PackagingStory />
      <ProductProof />
      <PurchaseRail />
    </>
  );
}
