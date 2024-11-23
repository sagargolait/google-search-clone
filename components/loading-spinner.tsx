export function LoadingSpinner() {
    return (
        <div className="relative">
            <div className="w-10 h-10 border-4 border-blue-200 rounded-full animate-spin">
                <div className="absolute top-0 left-0 w-full h-full border-t-4 border-blue-500 rounded-full animate-spin" />
            </div>
            <div className="stars-animation absolute inset-0">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="star absolute animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `twinkle ${1 + Math.random() * 2}s infinite`
                        }}
                    />
                ))}
            </div>
        </div>
    );
} 