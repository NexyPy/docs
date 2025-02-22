"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SideBarItem } from './SideBar';
import useStore from '@/store';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-end justify-center z-50">
            <div className="fixed inset-0 bg-background opacity-90" onClick={onClose}>

            </div>

            <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-[#F9FFFD]/6 backdrop-blur-2xl border border-[#7E8382]/12 rounded-t-[25px] w-full min-h-1/4 "
            >
                <button className=" bg-red-500/50 backdrop-blur-2xl border border-red-500 text-[#A9FFEA] rounded-[13px] w-fit px-3 py-1 absolute -top-10 left-[50%] -translate-x-1/2" onClick={onClose}>
                    close
                </button>
                {children}

            </motion.div>
        </div>
    );
};

const MenuBottomSheet = ({ }) => {
    const { menuIsOpen, setMenuIsOpen } = useStore();
    return (
        <>
        
        { menuIsOpen && <Modal isOpen={menuIsOpen} onClose={() => setMenuIsOpen(false)}>

            <div className="flex flex-col gap-3 p-2 pb-10" onClick={() => setMenuIsOpen(false)}>
                <SideBarItem />
            </div>
            
        </Modal>}
        </>
    );
  };


export {Modal, MenuBottomSheet};
