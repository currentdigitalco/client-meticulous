"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { InnerLayout } from "@/components/shared/inner-layout";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/lib/blog-posts";

gsap.registerPlugin(ScrollTrigger);

export function BlogPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".blog-hero-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 });

      gsap.utils.toArray<HTMLElement>(".blog-card").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <InnerLayout>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-copper-light">Blog</p>
          <h1 className="blog-hero-title mt-4 font-display text-5xl md:text-6xl tracking-tight leading-[0.95]">
            Tips, stories &<br /><span className="text-stone italic">field notes.</span>
          </h1>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="pb-16 md:pb-24">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <Link href={`/blog/${featured.slug}`} className="blog-card group relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 rounded-2xl overflow-hidden bg-soil-light/30 ring-1 ring-white/5 cursor-pointer block">
              <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 rounded-full bg-forest/90 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-cream">
                  Featured
                </div>
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-copper-light">{featured.category}</span>
                <h2 className="mt-3 font-display text-2xl md:text-3xl text-cream tracking-tight leading-tight group-hover:text-stone-light transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-stone-dark/60">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-4 text-xs text-stone-dark/40">
                  <span>{featured.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{featured.readTime}</span>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest-light group-hover:text-cream transition-colors">
                  Read article <ArrowRight size={14} strokeWidth={2} />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Post Grid */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card group cursor-pointer block">
                <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-5">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute top-3 left-3 rounded-full bg-soil/80 backdrop-blur-sm px-3 py-1 text-[11px] font-medium text-cream ring-1 ring-white/10">
                    {post.category}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-stone-dark/40 mb-3">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                </div>
                <h3 className="font-display text-xl text-cream tracking-tight leading-snug group-hover:text-stone-light transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-dark/50 line-clamp-2">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-forest-light group-hover:text-cream transition-colors">
                  Read more <ArrowRight size={12} strokeWidth={2} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </InnerLayout>
  );
}
