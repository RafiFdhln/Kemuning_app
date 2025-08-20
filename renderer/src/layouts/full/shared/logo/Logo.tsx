import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  marginTop: "15px",
  height: "70px", // Set the desired height
  width: "auto", // Width will adjust based on the aspect ratio of the image
  display: "block",
  position: "relative", // Required for responsive images
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image 
        src="/images/logos/app_logo.png" 
        alt="logo" 
        height={70} // Specify the height for the image
        width={194} // Original aspect ratio width (can be any, Next.js will calculate the correct ratio)
        layout="intrinsic" // Intrinsic layout keeps the original aspect ratio
        priority
      />
    </LinkStyled>
  );
};

export default Logo;
