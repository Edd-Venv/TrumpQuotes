import React from "react";

function Form() {
  return (
    <div>
      <form onSubmit={setState.title}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder=""
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <button
          style={{
            color: "black",
            fontSize: "0.4em",
            backgroundColor: "darkgrey"
          }}
          className="btn btn-primary btn-lg btn-block mb-5"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
}
export default Form;
