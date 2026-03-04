import type {Metadata} from "next";
import {Outfit,
    Cedarville_Cursive,
    Pacifico

} from "next/font/google";
import "./globals.css";
import React from "react";
import Provider from "@/app/Provider";
import StoreProvider from "@/redux/StoreProvider";
import Me from "@/CLIENT----SERVER/meInit";

const outfit=Outfit({
    variable:"--font-outfit",
    subsets:["latin"],
    weight:["100","200","400","500","600","700","800","900"]
})

const pacifico = Pacifico({
    variable: "--font-pacifico",
    subsets: ["latin"],
    weight: ["400"],
});

const cedarville_cursive= Cedarville_Cursive({
    variable: "--font-cedarville_cursive",
    subsets: ["latin"],
    weight: ["400"],
})



export const metadata: Metadata = {
    title: "Carryo",
    description: "Carryo elevates food delivery with curated global flavors," +
        " premium restaurant partners, and a smooth, elegant ordering experience.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${outfit.variable} ${pacifico.variable} ${cedarville_cursive.variable} `}>
        <body
            className="  min-h-[200vh] w-full"
        >
        <Provider>
            <StoreProvider>
                <Me/>
                {children}
            </StoreProvider>
        </Provider>

        </body>
        </html>
    );
}
