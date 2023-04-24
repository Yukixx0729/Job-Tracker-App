const createdColumns = [];

const loadJobs = () => {
  jobs.forEach(({ stages }) => {
    if (!createdColumns.includes(`${stages}`)) {
      const column = document.createElement("div");
      column.className = "col";
      jobContainer.appendChild(column);
      const columnHeading = document.createElement("h2");
      columnHeading.textContent = `${stages}`;

      column.appendChild(columnHeading);
      column.ondrop = "drop";
      column.ondragover = "allowDrop";
      createdColumns.push(`${stages}`);
    }
  });
};
