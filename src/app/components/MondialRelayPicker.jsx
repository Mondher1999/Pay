"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { X, Truck } from "lucide-react";

const PickerContent = dynamic(() => import("./PickerContent"), { ssr: false });

const MondialRelayModalSelector = ({ onPointSelected }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPointInfo, setSelectedPointInfo] = useState(null);

  const handlePointSelected = useCallback(
    (point) => {
      setSelectedPointInfo({
        id: point.Num,
        name: point.LgAdr1,
        address: `${point.LgAdr3}, ${point.CP} ${point.Ville}`,
      });

      const backendFormattedPoint = {
        Num: point.Num,
        Nom: point.LgAdr1,
        Adresse1: point.LgAdr3,
        Adresse2: point.LgAdr4,
        CP: point.CP,
        Ville: point.Ville,
      };

      if (onPointSelected) {
        onPointSelected(backendFormattedPoint);
      }

      setIsModalOpen(false);
    },
    [onPointSelected]
  );

  const InitialState = () => (
    <div className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold text-gray-800">Mondial Relay</p>
          <p className="text-sm text-gray-600">3 à 5 jours ouvrables</p>
        </div>
        <p className="font-bold text-gray-800">5,00 € TTC</p>
      </div>
     
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-black text-white font-bold py-3 mt-4 rounded-lg hover:bg-gray-800 transition-colors"
      >
        CHOIX DU POINT RELAIS
      </button>
    </div>
  );

  const SelectedState = () => (
    <div className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold text-gray-800">Mondial Relay</p>
          <p className="text-sm text-gray-600">3 à 5 jours ouvrables</p>
        </div>
        <p className="font-bold text-gray-800">5,00 € TTC</p>
      </div>
     
      <div className="mt-4 pt-4 border-t">
        <h4 className="font-bold text-gray-900">Point Relais sélectionné</h4>
        <div className="mt-1 text-sm text-gray-700">
          <p className="font-semibold">{selectedPointInfo.name}</p>
          <p>{selectedPointInfo.address}</p>
        </div>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-black text-white font-bold py-3 mt-4 rounded-lg hover:bg-gray-800 transition-colors"
      >
        MODIFIER LE POINT RELAIS
      </button>
    </div>
  );

  return (
    <div className="border rounded-lg shadow-sm bg-gray-50 w-full">
      {selectedPointInfo ? <SelectedState /> : <InitialState />}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-2 sm:p-4" aria-modal="true" role="dialog">
          <div className="bg-white rounded-xl shadow-2xl w-full h-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col">
            <header className="flex items-center justify-between p-3 sm:p-4 border-b shrink-0">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Sélectionnez votre point relais ou votre locker</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Fermer"
              >
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </header>
            <main className="flex-1 overflow-hidden">
              <PickerContent onPointSelected={handlePointSelected} />
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default MondialRelayModalSelector;
