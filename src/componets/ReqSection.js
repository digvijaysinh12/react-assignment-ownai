import React from "react";
import TalentInput from "./TalentInput";

const ReqSection = ({
  // one requirement section data
  section,
  // index of this section  
  idx, 
  // list of available job titles/reqs
  availableReqs, 
  formData, 
  errors, 
  handleReqChange,
  // This function is used to get talents for a job title 
  getTalentsForReq, 
  handleTalentSelect, 
  handleTalentFieldChange, 
  removeReqSection, 
  readOnly = false, 
}) => {
  // Get all talents available for the selected job title
  const talents = getTalentsForReq(section.jobTitle);

  return (
    <div className="border p-3 my-3 rounded">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div className="w-100">
          <label className="form-label">Job Title/REQ *</label>
          <select
            className={`form-select ${
              errors[`reqSection${idx}_jobTitle`] ? "is-invalid" : ""
            }`}
            value={section.jobTitle}
            onChange={(e) =>
              handleReqChange(section.id, "jobTitle", e.target.value)
            }
            disabled={!formData.clientName || readOnly} 
          >
            <option value="">Select Job Title</option>
            {availableReqs.map((r) => (
              <option key={r.id} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
          {/* Show error if job title not filled */}
          {errors[`reqSection${idx}_jobTitle`] && (
            <div className="invalid-feedback">
              {errors[`reqSection${idx}_jobTitle`]}
            </div>
          )}
        </div>

        {/* Delete button when edit but not in ready only is true */}
        {removeReqSection && !readOnly && (
          <button
            type="button"
            className="btn btn-link text-danger ms-2"
            onClick={() => removeReqSection(section.id)}
          >
            🗑️
          </button>
        )}
      </div>

      {/* Talents for this Job Title */}
      <div>
        {talents.length === 0 && (
          <p className="text-muted">No talents available for this REQ.</p>
        )}

        {/* Loop through all talents */}
        {talents.map((talent) => {
          const talentData = section.selectedTalents[talent.id] || {};

          // If in read-only true we display only talent details
          if (readOnly) {
            return (
              <TalentInput
                key={talent.id}
                sectionId={section.id}
                idx={idx}
                talent={{ ...talent, name: talentData.name || talent.name }}
                talentData={{ ...talentData, name: talent.name }}
                errors={errors}
                handleTalentFieldChange={handleTalentFieldChange}
                readOnly={true}
              />
            );
          }

          // If not read-only true then we displat→ show input fields
          return talentData.selected ? (
            // we display the  input fields for selected talent
            <TalentInput
              key={talent.id}
              sectionId={section.id}
              idx={idx}
              talent={{ ...talent, name: talent.name }}
              talentData={{ ...talentData, name: talent.name }}
              errors={errors}
              handleTalentFieldChange={handleTalentFieldChange}
            />
          ) : (
            // We display the  checkbox for unselected talent
            <div key={talent.id} className="form-check my-2">
              <input
                type="checkbox"
                className="form-check-input"
                checked={talentData.selected || false}
                onChange={(e) =>
                  handleTalentSelect(section.id, talent.id, e.target.checked)
                }
              />
              <label className="form-check-label">{talent.name}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReqSection;
