import React, { createContext, useState } from "react";
import { CLIENTS, PO_TYPES, REQS_BY_CLIENT, CURRENCIES } from "../constants/constants";

// We create Context sso all compoent can  share the same data
export const POContext = createContext();

// This is the Provider component → it wraps the app and gives data + functions
export const POProvider = ({ children }) => {

  // These are aall the basic PO fields
  const [formData, setFormData] = useState({
    clientName: "",
    poType: "",
    poNumber: "",
    receivedOn: "",
    receivedFromName: "",
    receivedFromEmail: "",
    poStartDate: "",
    poEndDate: "",
    budget: "",
    currency: "USD - Dollars ($)",
  });

  // This is Req Section variable
  // Each PO can have one or many req
  // Each req. has Jobtitil,reqId and SelectedTalents
  const [reqSections, setReqSections] = useState([
    { id: Date.now(), jobTitle: "", reqId: "", selectedTalents: {} },
  ]);

  // This will store which job titles/reqs are available for selected client
  const [availableReqs, setAvailableReqs] = useState([]);
  //This is for validation errors
  const [errors, setErrors] = useState({});
  // This show success after submit
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ----- Handlers -----
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // clear error if user corrected it
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));

    //if user changes client then update available REQs
    if (name === "clientName") {
      const clientId = parseInt(value);
      setAvailableReqs(REQS_BY_CLIENT[clientId] || []);
      // reset ReqSectiins for new client
      setReqSections([{ id: Date.now(), jobTitle: "", reqId: "", selectedTalents: {} }]);
    }
  };

  // Handle change in requiredment section
  const handleReqChange = (sectionId, field, value) => {
    setReqSections((prev) =>
      prev.map((s) => {
        if (s.id === sectionId) {
          const updated = { ...s, [field]: value };
          if (field === "jobTitle") {
            // when jobTitle chnages then find reqId and reset tailents
            const clientId = parseInt(formData.clientName);
            const req = (REQS_BY_CLIENT[clientId] || []).find((r) => r.name === value);
            updated.reqId = req ? req.id : "";
            updated.selectedTalents = {};
          }
          return updated;
        }
        return s;
      })
    );
  };

  // Talent is checked or not handler
  const handleTalentSelect = (sectionId, talentId, isChecked) => {
    setReqSections((prev) =>
      prev.map((s) => {
        if (s.id === sectionId) {
          const selectedTalents = { ...s.selectedTalents };

          // For individual PO - allow only one selection
          if (formData.poType === "individual" && isChecked) {
            Object.keys(selectedTalents).forEach((key) => {
              selectedTalents[key] = { ...(selectedTalents[key] || {}), selected: false };
            });
          }
          // ypdate the chosen talent
          selectedTalents[talentId] = {
            ...selectedTalents[talentId],
            selected: isChecked,
            contractDuration: selectedTalents[talentId]?.contractDuration || "",
            billRate: selectedTalents[talentId]?.billRate || "",
            billRateCurrency: selectedTalents[talentId]?.billRateCurrency || "USD - Dollars ($)",
            stdTimeBR: selectedTalents[talentId]?.stdTimeBR || "",
            stdTimeCurrency: selectedTalents[talentId]?.stdTimeCurrency || "USD - Dollars ($)",
            overTimeBR: selectedTalents[talentId]?.overTimeBR || "",
            overTimeCurrency: selectedTalents[talentId]?.overTimeCurrency || "USD - Dollars ($)",
          };

          return { ...s, selectedTalents };
        }
        return s;
      })
    );
  };

  // Handle when user types into talent fiels
  const handleTalentFieldChange = (sectionId, talentId, field, value) => {
    setReqSections((prev) =>
      prev.map((s) => {
        if (s.id === sectionId) {
          return {
            ...s,
            selectedTalents: {
              ...s.selectedTalents,
              [talentId]: { ...s.selectedTalents[talentId], [field]: value, selected: true },
            },
          };
        }
        return s;
      })
    );
  };

  // Add and remove requ sections
  const addReqSection = () =>
    setReqSections((prev) => [...prev, { id: Date.now(), jobTitle: "", reqId: "", selectedTalents: {} }]);

  const removeReqSection = (sectionId) => setReqSections((prev) => prev.filter((s) => s.id !== sectionId));

  // ----- Get Talents for selected job -----
  const getTalentsForReq = (jobTitle) => {
    if (!formData.clientName) return [];
    const clientId = parseInt(formData.clientName);
    const clientReqs = REQS_BY_CLIENT[clientId] || [];
    const req = clientReqs.find((r) => r.name === jobTitle);
    return req ? req.talents : [];
  };

  // ----- Validation -----
  const validateForm = () => {
    const newErrors = {};
    if (!formData.clientName) newErrors.clientName = "Client Name is required";
    if (!formData.poType) newErrors.poType = "PO Type is required";
    if (!formData.poNumber) newErrors.poNumber = "PO Number is required";
    if (!formData.receivedOn) newErrors.receivedOn = "Received On is required";
    if (!formData.receivedFromName) newErrors.receivedFromName = "Name is required";
    if (!formData.receivedFromEmail) newErrors.receivedFromEmail = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.receivedFromEmail))
      newErrors.receivedFromEmail = "Invalid email";
    if (!formData.poStartDate) newErrors.poStartDate = "PO Start Date required";
    if (!formData.poEndDate) newErrors.poEndDate = "PO End Date required";
    else if (formData.poStartDate && formData.poEndDate < formData.poStartDate)
      newErrors.poEndDate = "End date cannot be before start date";
    if (!formData.budget && formData.budget !== 0) newErrors.budget = "Budget required";
    else if (String(formData.budget).length > 5) newErrors.budget = "Budget must be max 5 digits";

    // Check each requirement section 
    reqSections.forEach((s, idx) => {
      if (!s.jobTitle) newErrors[`reqSection${idx}_jobTitle`] = "Job Title is required";

      //cout selected talents
      const selectedCount = Object.values(s.selectedTalents).filter((t) => t.selected).length;
      if (formData.poType === "individual" && selectedCount === 0) newErrors[`reqSection${idx}_talents`] = "Select one talent";
      if (formData.poType === "group" && selectedCount < 2) newErrors[`reqSection${idx}_talents`] = "Select at least two talents";

      // Check each selected talent fields
      Object.entries(s.selectedTalents).forEach(([id, t]) => {
        if (t.selected) {
          if (!t.contractDuration) newErrors[`reqSection${idx}_talent${id}_duration`] = "Contract duration required";
          if (!t.billRate) newErrors[`reqSection${idx}_talent${id}_billRate`] = "Bill rate required";
          if (!t.stdTimeBR) newErrors[`reqSection${idx}_talent${id}_stdTime`] = "Standard time required";
          if (!t.overTimeBR) newErrors[`reqSection${idx}_talent${id}_overTime`] = "Overtime required";
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true is no errors
  };

  // ----- Submit / Reset -----
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Saved PO data:", { formData, reqSections });
      setIsSubmitted(true);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setFormData({
      clientName: "",
      poType: "",
      poNumber: "",
      receivedOn: "",
      receivedFromName: "",
      receivedFromEmail: "",
      poStartDate: "",
      poEndDate: "",
      budget: "",
      currency: "USD - Dollars ($)",
    });
    setReqSections([{ id: Date.now(), jobTitle: "", reqId: "", selectedTalents: {} }]);
    setErrors({});
    setIsSubmitted(false);
    setAvailableReqs([]);
  };

  // Provide all states and functions to children
  return (
    <POContext.Provider
      value={{
        formData,
        errors,
        reqSections,
        availableReqs,
        handleChange,
        handleReqChange,
        handleTalentSelect,
        handleTalentFieldChange,
        addReqSection,
        removeReqSection,
        handleSubmit,
        handleReset,
        isSubmitted,
        CLIENTS,
        PO_TYPES,
        CURRENCIES,
        getTalentsForReq,
      }}
    >
      {children}
    </POContext.Provider>
  );
};
