"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/sections/Footer";

const fullMenu = [
  {
    category: "Starters",
    items: [
      { name: "Paneer Tikka", price: "₹350", desc: "The one everyone orders twice", tag: "Veg" },
      { name: "Crispy Chilli Babycorn", price: "₹320", desc: "Sweet and spicy tossed babycorn", tag: "Veg" },
      { name: "Chicken Tikka", price: "₹450", desc: "Smoky, straight off the grill", tag: "Non-Veg" },
      { name: "Mutton Seekh Kebab", price: "₹550", desc: "Spiced minced lamb on skewers", tag: "Non-Veg" }
    ]
  },
  {
    category: "Mains",
    items: [
      { name: "Dal Makhani", price: "₹300", desc: "Slow-cooked black lentils", tag: "Veg" },
      { name: "Veg Biryani", price: "₹350", desc: "A house favourite", tag: "Veg" },
      { name: "Butter Chicken", price: "₹500", desc: "Classic rich tomato gravy", tag: "Non-Veg" },
      { name: "Mutton Rogan Josh", price: "₹550", desc: "Traditional Kashmiri style", tag: "Non-Veg" }
    ]
  },
  {
    category: "Wood-Fired Pizza",
    items: [
      { name: "Margherita", price: "₹450", desc: "Classic mozzarella and basil", tag: "Veg" },
      { name: "Farmhouse", price: "₹500", desc: "Loaded with fresh veggies", tag: "Veg" },
      { name: "Chicken Pepperoni", price: "₹600", desc: "Spicy chicken pepperoni slices", tag: "Non-Veg" },
      { name: "BBQ Chicken", price: "₹600", desc: "Smoky BBQ sauce and grilled chicken", tag: "Non-Veg" }
    ]
  }
];

export default function MenuPage() {
  return (
    <main className="flex flex-col min-h-screen bg-cream text-wine w-full">
      <div className="pt-32 pb-16 px-6 max-w-4xl mx-auto w-full flex-grow">
        <Link href="/" className="inline-flex items-center gap-2 text-wine/70 hover:text-wine font-medium transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <h1 className="text-5xl md:text-7xl font-bold font-outfit mb-4">Full Menu</h1>
        <p className="text-xl text-wine/80 mb-16">
          Everything from our grill, tandoor, and bar.
        </p>

        <div className="space-y-16">
          {fullMenu.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-3xl font-bold font-outfit border-b-2 border-wine/20 pb-4 mb-8">
                {section.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex justify-between items-start group">
                    <div className="flex flex-col max-w-[70%]">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold group-hover:text-algae transition-colors">{item.name}</h3>
                        <span className={`w-3 h-3 rounded-sm border ${item.tag === 'Veg' ? 'border-green-600 bg-green-100' : 'border-red-600 bg-red-100'}`}>
                          <span className={`block w-1.5 h-1.5 rounded-full mx-auto mt-[2px] ${item.tag === 'Veg' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                        </span>
                      </div>
                      <p className="text-wine/70 text-sm mt-1">{item.desc}</p>
                    </div>
                    <span className="font-bold text-lg">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
