import React, { useContext } from "react";
import { POContext } from "../context/POContext";
import MainPOFields from "./MainPOFields";
import ReqSection from "./ReqSection";

const PurchaseOrderForm = () => {
  // this data and method comes from POContext for better State management
  // SO that we can write clean code
  const {
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
  } = useContext(POContext);

  // This is check form is submitted 
  // base on this variable our page will be behave that  it will take that data or display the data.
  const readOnly = isSubmitted;

  return (
    <form onSubmit={handleSubmit} noValidate>
      {!readOnly && (
        <div className="card p-3 mb-3">
          <h5 className="mb-3">Purchase Order Details</h5>
          {/* Now this componetn is take used for take data client details and po details  */}
          <MainPOFields
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            CLIENTS={CLIENTS}
            PO_TYPES={PO_TYPES}
            CURRENCIES={CURRENCIES}
          />

          <h5 className="mt-4">Talent / REQ Details</h5>
          {/* Thi componet is used for take Talent details */}
          {reqSections.map((section, idx) => (
            <ReqSection
              key={section.id}
              section={section}
              idx={idx}
              availableReqs={availableReqs}
              formData={formData}
              errors={errors}
              handleReqChange={handleReqChange}
              getTalentsForReq={getTalentsForReq}
              handleTalentSelect={handleTalentSelect}
              handleTalentFieldChange={handleTalentFieldChange}
              removeReqSection={reqSections.length > 1 ? removeReqSection : null}
              readOnly={false}
            />
          ))}

          <div className="mb-3 mt-3">
            <button type="button" className="btn btn-secondary me-2" onClick={handleReset}>
              Reset
            </button>
            <button type="submit" className="btn btn-primary me-2">
              Submit
            </button>
            {formData.poType === "group" && (
              <button type="button" className="btn btn-outline-success" onClick={addReqSection}>
                Add Another REQ
              </button>
            )}
          </div>
        </div>
      )}

      {readOnly && (
        <div className="card p-3">
          <h5 className="mb-3">Submitted Details</h5>

          <div className="mb-3">
            <h6>PO Information</h6>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Client Name:</strong>{" "}
                {CLIENTS.find((c) => c.id === parseInt(formData.clientName))?.name || "-"}
              </li>
              <li className="list-group-item">
                <strong>PO Type:</strong> {PO_TYPES.find((t) => t.id === formData.poType)?.name || "-"}
              </li>
              <li className="list-group-item">
                <strong>PO Number:</strong> {formData.poNumber || "-"}
              </li>
              <li className="list-group-item">
                <strong>Received On:</strong> {formData.receivedOn || "-"}
              </li>
              <li className="list-group-item">
                <strong>Received From:</strong> {formData.receivedFromName || "-"} ({formData.receivedFromEmail || "-"})
              </li>
              <li className="list-group-item">
                <strong>PO Start Date:</strong> {formData.poStartDate || "-"}
              </li>
              <li className="list-group-item">
                <strong>PO End Date:</strong> {formData.poEndDate || "-"}
              </li>
              <li className="list-group-item">
                <strong>Budget:</strong> {formData.budget || "-"} ({formData.currency})
              </li>
            </ul>
          </div>

          <div>
            <h6>Talent Details</h6>
            {reqSections.map((section, idx) => {
              const talents = Object.entries(section.selectedTalents)
                .filter(([, t]) => t.selected)
                .map(([id, t]) => ({ id, ...t }));

              return (
                <div key={section.id} className="mb-3 border p-2 rounded">
                  <h6>
                    REQ {idx + 1}: {section.jobTitle || "-"}
                  </h6>

                  {talents.length > 0 ? (
                    <table className="table table-sm table-bordered mt-2">
                      <thead className="table-light">
                        <tr>
                          <th>Talent Name</th>
                          <th>Contract Duration (months)</th>
                          <th>Bill Rate</th>
                          <th>Standard Time</th>
                          <th>Overtime</th>
                        </tr>
                      </thead>
                      <tbody>
                        {talents.map((talent, i) => (
                          <tr key={talent.id + i}>
                            <td>{talent.name || "-"}</td>
                            <td>{talent.contractDuration || "-"}</td>
                            <td>
                              {talent.billRate || "-"} ({talent.billRateCurrency || "-"})
                            </td>
                            <td>
                              {talent.stdTimeBR || "-"} ({talent.stdTimeCurrency || "-"})
                            </td>
                            <td>
                              {talent.overTimeBR || "-"} ({talent.overTimeCurrency || "-"})
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-muted">No talents selected.</p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-3">
            <button className="btn btn-warning me-2" onClick={handleReset}>
              Reset Form
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default PurchaseOrderForm;
