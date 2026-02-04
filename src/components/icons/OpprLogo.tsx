import Image from "next/image";

export function OpprLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/opprlogo.svg"
      alt="Oppr.ai Logo"
      width={120}
      height={40}
      className={className}
      priority
    />
  );
}

export function OpprLogoWhite({ className }: { className?: string }) {
  return (
    <Image
      src="/images/opprlogo.svg"
      alt="Oppr.ai Logo"
      width={120}
      height={40}
      className={`${className} brightness-0 invert`}
    />
  );
}

export function OpprLogoIcon({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`} style={{ width: 40, height: 40 }}>
      <Image
        src="/images/opprlogo.svg"
        alt="Oppr.ai"
        width={120}
        height={40}
        className="absolute left-[-4px] top-0 max-w-none h-full w-auto"
      />
    </div>
  );
}
