<template>
  <section class="appointments-table bg-white rounded-lg p-3">
    <table>
      <thead>
        <tr>
          <th>1</th>
          <th>1</th>
          <th>1</th>
          <th>1</th>
          <th>1</th>
          <th>1</th>
        </tr>
      </thead>
      <tbody>
        <th>test</th>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss">
.appointments-table {
  table {
    font-family: "Fraunces", serif;
    white-space: nowrap;
    margin: 0;
    border: none;
    border-collapse: separate;
    border-spacing: 0;
    table-layout: fixed;
    border: 1px solid black;
  }
  table td,
  table th {
    border: 1px solid black;
    padding: 0.5rem 1rem;
  }
  table thead th {
    padding: 3px;
    position: sticky;
    top: 0;
    z-index: 1;
    width: 25vw;
    background: white;
  }
  table td {
    background: #fff;
    padding: 4px 5px;
    text-align: center;
  }

  table tbody th {
    font-weight: 100;
    font-style: italic;
    text-align: left;
    position: relative;
  }
  table thead th:first-child {
    position: sticky;
    left: 0;
    z-index: 2;
  }
  table tbody th {
    position: sticky;
    left: 0;
    background: white;
    z-index: 1;
  }
  caption {
    text-align: left;
    padding: 0.25rem;
    position: sticky;
    left: 0;
  }

  [role="region"][aria-labelledby][tabindex] {
    width: 100%;
    max-height: 98vh;
    overflow: auto;
  }
  [role="region"][aria-labelledby][tabindex]:focus {
    box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.5);
    outline: 0;
  }
}
</style>
