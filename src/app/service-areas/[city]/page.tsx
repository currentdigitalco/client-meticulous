import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    openGraph: {
      title: area.seoTitle,
      description: area.seoDescription,
      type: "article",
      url: `https://meticulous802.com/service-areas/${area.slug}`,
    },
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
