export const sharedStyles = {
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  input: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      transition: "all 0.2s",
      "&:hover": {
        backgroundColor: "#FAFAFA",
      },
    },
  },
  table: {
    "& .RaDatagrid-thead": {
      backgroundColor: "#FAFAFA",
    },
    "& .RaDatagrid-row": {
      transition: "all 0.2s",
      "&:hover": {
        backgroundColor: "#F5F5F5",
      },
    },
  },
  button: {
    backgroundColor: "#2A2A2A",
    color: "#FFFFFF",
    padding: "8px 16px",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#404040",
    },
    marginLeft: "16px",
  },
  analyticsContainer: {
    padding: "24px",
    "& .grid": {
      display: "grid",
      gap: "24px",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    },
  },
};
