import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceDetails, getServiceBySlug } from "./service-data";
import { ServiceDetailPage } from "./service-detail-page";
import { buildOpenGraph } from "@/lib/og";

export function generateStaticParams() {
  return serviceDetails.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: buildOpenGraph({
      title: service.seoTitle,
      description: service.seoDescription,
      path: `/services/${service.slug}`,
    }),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  // FAQPage schema is generated from the SAME `faqs` array the page renders as
  // visible <h2>/<p> pairs (service-detail-page.tsx), so no schema question can
  // exist without being on-page. Same pattern as service-areas/[city]/[service].
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ServiceDetailPage service={service} allServices={serviceDetails} />
    </>
  );
}
