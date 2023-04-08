import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-between bg-white py-4 px-6 mb-8 border-b">
      <Link href="/" className="text-3xl font-bold">
        site.name
      </Link>
      <nav className="flex items-center">
        <Link href="/" className="mr-6">
          Visited Map
        </Link>
        <Link href="/" className="mr-6">
          My Travels
        </Link>
        <Link href="/" className="mr-6">
          Challenges
        </Link>
        <Link href="/">My Profile</Link>
      </nav>
    </header>
  );
};

export default Header;
