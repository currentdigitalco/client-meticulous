"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { InnerLayout } from "@/components/shared/inner-layout";
import { ArrowLeft, Clock, Phone } from "lucide-react";
import type { BlogPost } from "@/lib/blog-posts";

gsap.registerPlugin(ScrollTrigger);

export function BlogPostPage({ post }: { post: BlogPost }) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".post-hero-img",
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }
      );
      gsap.fromTo(
        ".post-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".post-meta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.4 }
      );
      gsap.fromTo(
        ".post-body",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.5 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <InnerLayout>
      {/* Hero Image */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="post-hero-img w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-soil via-soil/50 to-transparent" />
      </section>

      {/* Article */}
      <article className="relative -mt-32 z-10 pb-24 md:pb-32">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-stone-dark/50 hover:text-cream transition-colors mb-8"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to Blog
          </Link>

          {/* Category & Meta */}
          <div className="post-meta">
            <span className="inline-block rounded-full bg-forest/80 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-cream">
              {post.category}
            </span>
            <div className="mt-4 flex items-center gap-4 text-xs text-stone-dark/50">
              <span>{post.date}</span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="post-title mt-6 font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-cream">
            {post.title}
          </h1>

          {/* Content */}
          <div
            className="post-body mt-12 prose-meticulous"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA */}
          <div className="mt-16 p-8 md:p-12 rounded-2xl bg-forest/30 ring-1 ring-forest/20">
            <p className="font-display text-2xl md:text-3xl text-cream tracking-tight">
              Got a question about your property?
            </p>
            <p className="mt-3 text-sm text-stone-dark/60 leading-relaxed">
              We&apos;ve been doing this in Rutland County since 2009. Give us a
              call or send a message — we&apos;re happy to talk through what
              makes sense for your situation.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-8 py-4 text-base font-medium text-forest transition-all hover:bg-stone-light"
              >
                Get a Quote
              </a>
              <a
                href="tel:802-342-8293"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-transparent ring-1 ring-cream/30 px-8 py-4 text-base font-medium text-cream transition-all hover:bg-cream/10"
              >
                <Phone size={16} strokeWidth={2} />
                802-342-8293
              </a>
            </div>
          </div>
        </div>
      </article>
    </InnerLayout>
  );
}
