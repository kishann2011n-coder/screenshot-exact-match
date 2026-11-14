import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero, CtaBand } from "@/components/site/sections";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/motion";
import { getPost, POSTS } from "@/data/blog";
import { SITE } from "@/data/site";
import { breadcrumbLd, scripts, seo } from "@/lib/seo";
import { photoUrl } from "@/data/images";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Article not found | Gauri Entertainment" }, { name: "robots", content: "noindex" }] };
    const { post } = loaderData;
    return {
      ...seo({ title: post.title, description: post.excerpt, path: `/blog/${params.slug}`, image: post.image, type: "article" }),
      scripts: scripts(
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          image: photoUrl(post.image, 1200, 630),
          author: { "@type": "Organization", name: SITE.name },
          publisher: { "@type": "Organization", name: SITE.name },
        },
        breadcrumbLd([{ name: "Home", path: "/" }, { name: "Knowledge Centre", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]),
      ),
    };
  },
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <>
      <PageHero eyebrow={`${post.category} · ${post.readMinutes} min read`} title={post.title} text={post.excerpt} photo={post.image} crumbs={[{ label: "Home", to: "/" }, { label: "Knowledge Centre", to: "/blog" }, { label: post.category }]} />
      <article className="bg-paper py-20">
        <div className="container-x max-w-3xl">
          {post.body.map((b, i) => (
            <Reveal key={i} className="mt-10 first:mt-0">
              {b.h && <h2 className="text-3xl">{b.h}</h2>}
              {b.p.map((t) => <p key={t} className="mt-4 text-lg leading-relaxed text-muted-foreground">{t}</p>)}
              {b.list && (
                <ul className="mt-4 space-y-2">
                  {b.list.map((l) => <li key={l} className="flex gap-3 text-lg text-muted-foreground"><span className="mt-3 h-1.5 w-1.5 shrink-0 rotate-45 bg-primary" />{l}</li>)}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      </article>
      <section className="bg-card py-20">
        <div className="container-x">
          <h2 className="text-3xl">Keep reading</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {more.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-2xl border bg-background">
                <div className="aspect-[16/10] overflow-hidden"><Photo photo={p.image} width={600} className="img-zoom group-hover:scale-105" /></div>
                <div className="p-5"><p className="eyebrow text-primary">{p.category}</p><h3 className="mt-2 text-xl">{p.title}</h3></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand photo={post.image} />
    </>
  );
}
