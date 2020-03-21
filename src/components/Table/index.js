import React from "react";
import { Table, Row, Column, TableHeader, TableHeaderColumn } from "./styles";

export default function Tables({ header, rows, orderedBy, setCurrentCountry }) {
  return (
    <Table>
      <thead>
        {header && (
          <TableHeader>
            {header.map(column => (
              <TableHeaderColumn key={column} onClick={() => orderedBy(column)}>
                {column}
              </TableHeaderColumn>
            ))}
          </TableHeader>
        )}
      </thead>
      <tbody>
        {rows.map(row => (
          <Row key={row}>
            {row.map((column, i) => {
              const onClickAttribute = {
                onClick: i === 0 ? () => setCurrentCountry(column) : null
              };
              return (
                <Column key={i}{...onClickAttribute}>
                  {column}
                </Column>
              );
            })}
          </Row>
        ))}
      </tbody>
    </Table>
  );
}
