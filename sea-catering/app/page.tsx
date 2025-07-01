"use client";
import FeatureCard from "@/components/FeatureCard";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
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
      <section id="testimonials" className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          What Our Customers Say
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
            <h3 className="text-2xl font-semibold mb-6 text-white">
              Leave Us a Review
            </h3>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Customer Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="review"
                  className="block text-sm font-medium text-gray-300"
                >
                  Review Message
                </label>
                <textarea
                  id="review"
                  rows={4}
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Rating
                </label>
                <div className="flex gap-1 text-2xl text-gray-500 mt-1">
                  {"★"
                    .repeat(5)
                    .split("")
                    .map((_, i) => (
                      <span
                        key={i}
                        className="cursor-pointer hover:text-yellow-400"
                      >
                        ★
                      </span>
                    ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-cyan-500 text-white py-2 px-4 rounded hover:bg-cyan-600 transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="text-gray-300">
                Makanannya enak dan selalu datang tepat waktu. Program diet jadi
                lebih mudah!
              </p>
              <div className="flex justify-between items-center mt-4">
                <p className="font-semibold text-white">- Anita Wijaya</p>
                <p className="text-yellow-400">★★★★★</p>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="text-gray-300">
                Pilihan proteinnya mantap, sangat membantu progres gym saya.
                Recommended!
              </p>
              <div className="flex justify-between items-center mt-4">
                <p className="font-semibold text-white">- Budi Santoso</p>
                <p className="text-yellow-400">★★★★★</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
