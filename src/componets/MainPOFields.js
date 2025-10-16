import React from "react";

const MainPOFields = ({ formData, errors, handleChange, CLIENTS, PO_TYPES, CURRENCIES }) => {
  return (
    <div className="row g-3 mb-4">
      {/* client name */}
      <div className="col-md-6">
        <label className="form-label">Client Name *</label>
        <select
          className={`form-select ${errors.clientName ? "is-invalid" : ""}`}
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
        >
          <option value="">Select Client</option>
          {CLIENTS.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        {errors.clientName && <div className="invalid-feedback">{errors.clientName}</div>}
      </div>

      {/* PO Type */}
      <div className="col-md-6">
        <label className="form-label">Purchase Order Type *</label>
        <select
          className={`form-select ${errors.poType ? "is-invalid" : ""}`}
          name="poType"
          value={formData.poType}
          onChange={handleChange}
        >
          <option value="">Select PO Type</option>
          {PO_TYPES.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        {errors.poType && <div className="invalid-feedback">{errors.poType}</div>}
      </div>

      {/* PO Number */}
      <div className="col-md-6">
        <label className="form-label">Purchase Order No. *</label>
        <input
          type="text"
          className={`form-control ${errors.poNumber ? "is-invalid" : ""}`}
          name="poNumber"
          value={formData.poNumber}
          onChange={handleChange}
        />
        {errors.poNumber && <div className="invalid-feedback">{errors.poNumber}</div>}
      </div>

      {/* Received On */}
      <div className="col-md-6">
        <label className="form-label">Received On *</label>
        <input
          type="date"
          className={`form-control ${errors.receivedOn ? "is-invalid" : ""}`}
          name="receivedOn"
          value={formData.receivedOn}
          onChange={handleChange}
        />
        {errors.receivedOn && <div className="invalid-feedback">{errors.receivedOn}</div>}
      </div>

      {/* Received From Name */}
      <div className="col-md-6">
        <label className="form-label">Received From Name *</label>
        <input
          type="text"
          className={`form-control ${errors.receivedFromName ? "is-invalid" : ""}`}
          name="receivedFromName"
          value={formData.receivedFromName}
          onChange={handleChange}
        />
        {errors.receivedFromName && <div className="invalid-feedback">{errors.receivedFromName}</div>}
      </div>

      {/* Received From Email */}
      <div className="col-md-6">
        <label className="form-label">Received From Email *</label>
        <input
          type="email"
          className={`form-control ${errors.receivedFromEmail ? "is-invalid" : ""}`}
          name="receivedFromEmail"
          value={formData.receivedFromEmail}
          onChange={handleChange}
        />
        {errors.receivedFromEmail && <div className="invalid-feedback">{errors.receivedFromEmail}</div>}
      </div>

      {/* PO Start Date */}
      <div className="col-md-6">
        <label className="form-label">PO Start Date *</label>
        <input
          type="date"
          className={`form-control ${errors.poStartDate ? "is-invalid" : ""}`}
          name="poStartDate"
          value={formData.poStartDate}
          onChange={handleChange}
        />
        {errors.poStartDate && <div className="invalid-feedback">{errors.poStartDate}</div>}
      </div>

      {/* PO End Date */}
      <div className="col-md-6">
        <label className="form-label">PO End Date *</label>
        <input
          type="date"
          className={`form-control ${errors.poEndDate ? "is-invalid" : ""}`}
          name="poEndDate"
          value={formData.poEndDate}
          onChange={handleChange}
        />
        {errors.poEndDate && <div className="invalid-feedback">{errors.poEndDate}</div>}
      </div>

      {/* Budget */}
      <div className="col-md-6">
        <label className="form-label">Budget *</label>
        <div className="input-group">
          <input
            type="number"
            className={`form-control ${errors.budget ? "is-invalid" : ""}`}
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            min={0}
            // Only 5 digit allow for the budget
            max={99999} 
          />
          <select className="form-select" name="currency" value={formData.currency} onChange={handleChange}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.budget && <div className="invalid-feedback">{errors.budget}</div>}
        </div>
      </div>
    </div>
  );
};

export default MainPOFields;
