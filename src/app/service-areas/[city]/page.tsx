import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildOpenGraph } from "@/lib/og";
import { serviceAreas, getServiceAreaBySlug } from "@/lib/service-areas";
import { serviceDetails } from "@/app/services/[slug]/service-data";
import { CityPage } from "./city-page";

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ city: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const area = getServiceAreaBySlug(city);
  if (!area) return {};
  return {
    title: area.seoTitle,
    description: area.seoDescription,
    alternates: {
      canonical: `/service-areas/${area.slug}`,
    },
    openGraph: buildOpenGraph({
      title: area.seoTitle,
      description: area.seoDescription,
      path: `/service-areas/${area.slug}`,
      image: area.heroImage,
      type: "article",
    }),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const area = getServiceAreaBySlug(city);
  if (!area) notFound();
  return (
    <CityPage
      area={area}
      allServices={serviceDetails}
      allAreas={serviceAreas}
    />
  );
}
