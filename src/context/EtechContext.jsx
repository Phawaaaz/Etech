import { createContext, useContext, useState } from "react";

const EtechContext = createContext(null);

export function EtechProvider({ children }) {
  const [wizardData, setWizardData] = useState({
    format: null,
    prompt: "",
    topic: "",
    level: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateWizard = (fields) =>
    setWizardData((prev) => ({ ...prev, ...fields }));

  return (
    <EtechContext.Provider
      value={{ wizardData, updateWizard, result, setResult, loading, setLoading }}
    >
      {children}
    </EtechContext.Provider>
  );
}

export const useEtech = () => useContext(EtechContext);
