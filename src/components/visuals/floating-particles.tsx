import { useState } from 'react';

const FloatingParticles = () => {
    const [particles] = useState<Array<{ left: number; top: number; animationDelay: number }>>(
        () =>
            [...Array(20)].map(() => ({
                left: Math.random() * 100,
                top: Math.random() * 100,
                animationDelay: Math.random() * 2,
            }))
    );

    return (
        <div>
            {particles.map((particle, i) => (
                <div
                    key={i}
                    className="bg-primary float absolute h-1 w-1 rounded-full opacity-40"
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        animationDelay: `${particle.animationDelay}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingParticles;
