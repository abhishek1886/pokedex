import React from "react";

const MovesTable = (props) => {
  console.log(props);
  return (
    <table className="table m-1 table-auto text-xs w-[96%]">
      <thead className="p-1 border border-[#ff8945]">
        <tr className="border border-[#ff8945]">
          <th className="border border-[#ff8945]">Name</th>
          <th className="border border-[#ff8945]">Class</th>
          <th className="border border-[#ff8945]">Power</th>
          <th>Accuracy</th>
        </tr>
      </thead>
      <tbody className="p-1 border border-[#ff8945]">
        {props.movesStats.map((move, i) => (
          <tr key={i} className="border border-[#ff8945]">
            <td className="border border-[#ff8945]">{move.name}</td>
            <td className="border border-[#ff8945]">{move.damage_class}</td>
            <td className="border border-[#ff8945]">{move.power ? move.power : 'N/A'}</td>
            <td className="border border-[#ff8945]">{move.accuracy ? move.accuracy : 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MovesTable;
