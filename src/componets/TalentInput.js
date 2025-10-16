import React from "react";

const TalentInput = ({
  sectionId,
  idx,
  talent,
  talentData,
  errors,
  handleTalentFieldChange,
  readOnly = false,
}) => {
  const CURRENCIES = ["USD - Dollars ($)", "EUR - Euros (€)", "GBP - Pounds (£)", "INR - Rupees (₹)"];

  if (readOnly) {
    if (!talentData.selected) return null;
    return (
      <div className="row g-2 mt-2 d-block border rounded p-2 my-2">
        <strong>{talent.name}</strong>
        <div>Contract Duration: {talentData.contractDuration || "-"}</div>
        <div>Bill Rate: {talentData.billRate || "-"} ({talentData.billRateCurrency || "-"})</div>
        <div>Standard Time: {talentData.stdTimeBR || "-"} ({talentData.stdTimeCurrency || "-"})</div>
        <div>Overtime: {talentData.overTimeBR || "-"} ({talentData.overTimeCurrency || "-"})</div>
      </div>
    );
  }

  return (
    <div className="row g-2 mt-2">
      {/* Contract Duration state */}
      <div className="col-md-3">
        <input
          type="number"
          className={`form-control ${errors[`reqSection${idx}_talent${talent.id}_duration`] ? "is-invalid" : ""}`}
          placeholder="Contract Duration (months)"
          value={talentData.contractDuration || ""}
          onChange={(e) => handleTalentFieldChange(sectionId, talent.id, "contractDuration", e.target.value)}
          min={0}
        />
        {errors[`reqSection${idx}_talent${talent.id}_duration`] && (
          <div className="invalid-feedback">{errors[`reqSection${idx}_talent${talent.id}_duration`]}</div>
        )}
      </div>

      {/* Bill Rate */}
      <div className="col-md-3">
        <div className="input-group">
          <select
            className="form-select"
            value={talentData.billRateCurrency || "USD - Dollars ($)"}
            onChange={(e) => handleTalentFieldChange(sectionId, talent.id, "billRateCurrency", e.target.value)}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="number"
            className={`form-control ${errors[`reqSection${idx}_talent${talent.id}_billRate`] ? "is-invalid" : ""}`}
            placeholder="Bill Rate"
            value={talentData.billRate || ""}
            onChange={(e) => handleTalentFieldChange(sectionId, talent.id, "billRate", e.target.value)}
            min={0}
          />
          {errors[`reqSection${idx}_talent${talent.id}_billRate`] && (
            <div className="invalid-feedback">{errors[`reqSection${idx}_talent${talent.id}_billRate`]}</div>
          )}
        </div>
      </div>

      {/* Standard Time */}
      <div className="col-md-3">
        <div className="input-group">
          <select
            className="form-select"
            value={talentData.stdTimeCurrency || "USD - Dollars ($)"}
            onChange={(e) => handleTalentFieldChange(sectionId, talent.id, "stdTimeCurrency", e.target.value)}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="number"
            className={`form-control ${errors[`reqSection${idx}_talent${talent.id}_stdTime`] ? "is-invalid" : ""}`}
            placeholder="Standard Time"
            value={talentData.stdTimeBR || ""}
            onChange={(e) => handleTalentFieldChange(sectionId, talent.id, "stdTimeBR", e.target.value)}
            min={0}
          />
          {errors[`reqSection${idx}_talent${talent.id}_stdTime`] && (
            <div className="invalid-feedback">{errors[`reqSection${idx}_talent${talent.id}_stdTime`]}</div>
          )}
        </div>
      </div>

      {/* Overtime */}
      <div className="col-md-3">
        <div className="input-group">
          <select
            className="form-select"
            value={talentData.overTimeCurrency || "USD - Dollars ($)"}
            onChange={(e) => handleTalentFieldChange(sectionId, talent.id, "overTimeCurrency", e.target.value)}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="number"
            className={`form-control ${errors[`reqSection${idx}_talent${talent.id}_overTime`] ? "is-invalid" : ""}`}
            placeholder="Overtime"
            value={talentData.overTimeBR || ""}
            onChange={(e) => handleTalentFieldChange(sectionId, talent.id, "overTimeBR", e.target.value)}
            min={0}
          />
          {errors[`reqSection${idx}_talent${talent.id}_overTime`] && (
            <div className="invalid-feedback">{errors[`reqSection${idx}_talent${talent.id}_overTime`]}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TalentInput;
