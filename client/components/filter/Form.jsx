import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";
import Filters from "./Filters";
import { CiFilter } from "react-icons/ci";

export default function Form({ handleFilterChange }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  }
  const handleClose= () => {
    onClose();
  }
  
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <button onClick={handleOpen}>
          <CiFilter size={20} />
        </button>
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Filter</ModalHeader>
          <ModalBody>
            <Filters onFilterChange={handleFilterChange} handleClose={handleClose}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
