import { Users, Award, Star, MessageCircle } from "lucide-react";

export default function StatsSection() {

    const stats = [
        { icon: Users, label: 'Happy Clients', value: '500+' },
        { icon: Award, label: 'Properties Sold', value: '1,200+' },
        { icon: Star, label: 'Client Satisfaction', value: '98%' },
        { icon: MessageCircle, label: 'Client Interactions', value: '2000+' }
      ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            return (
              <div key={index} className="text-center animate-slide-up">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{ background: "var(--gradient-luxury)" }}
                >
                  <stat.icon
                    className="w-8 h-8"
                    stroke="currentColor"
                    style={{ color: "hsl(var(--primary))" }}
                  />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

 