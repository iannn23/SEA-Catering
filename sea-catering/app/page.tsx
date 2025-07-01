import Navbar from "@/components/Navbar";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col justify-center text-center px-6">
        <section className="py-20">
          <h2 className="text-5xl md:text-7xl font-bold leading-tight text-white">
            Healthy Meals, <br />
            <span className="text-cyan-400">Anytime, Anywhere</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
            Selamat datang di SEA Catering! Platform katering makanan sehat yang
            dapat disesuaikan dengan kebutuhan Anda dan diantar ke seluruh
            Indonesia.
          </p>
        </section>
        <section id="fitur" className="py-20">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Custom Makanan Kalian"
              description="Sesuaikan menu dengan selera dan kebutuhan kalori harian Anda."
            />
            <FeatureCard
              title="Delivery ke Kota Anda"
              description="Kami menjangkau kota-kota besar di Indonesia untuk kemudahan Anda."
            />
            <FeatureCard
              title="Detail Info Nutrisi"
              description="Ketahui informasi gizi dari setiap makanan yang Anda pesan."
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
