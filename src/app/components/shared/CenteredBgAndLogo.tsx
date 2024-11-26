import Image from "next/image";
interface CenteredLogoProps {
    backgroundSrc: string;
    logoSrc: string;
    altText?: string;
}

const CenteredBgAndLogo = ({ backgroundSrc, logoSrc, altText = "Logo" }: CenteredLogoProps) => {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <Image
                src={backgroundSrc}
                alt="Background"
                layout="fill"
                objectFit="cover"
                quality={100}
            />
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Image
                    src={logoSrc}
                    alt={altText}
                    width={512}
                    height={512}
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                />
            </div>
        </div>
    );
};

export default CenteredBgAndLogo;