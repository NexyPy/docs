"use client"
import { useState } from "react";
import { Menu } from "../icons/menu";
import useStore from "@/store";


const MenuButton = () => {
    const {menuIsOpen, setMenuIsOpen} = useStore()
    return (
        <>
            <button
                className="md:hidden"
                onClick={() => {
                    setMenuIsOpen(!menuIsOpen)
                }}
            >
                <Menu />
            </button>
            
        </>
    )
}

export { MenuButton }