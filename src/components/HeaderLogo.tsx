import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeaderLogo = () => {
  return (
    <Link href="/">
      <Image width={180} height={70} src="logo.svg" alt="logo" />
    </Link>
  );
};

export default HeaderLogo;
