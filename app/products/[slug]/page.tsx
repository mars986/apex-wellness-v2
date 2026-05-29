type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-sm text-slate-500">Product</p>
      <h1 className="mt-2 text-4xl font-bold">{slug}</h1>
      <div className="mt-8 rounded-xl border p-6">
        <p className="text-slate-600">Product details coming next.</p>
      </div>
    </main>
  );
}