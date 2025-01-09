export const sharedStyles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  input: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      transition: 'all 0.2s',
      '&:hover': {
        backgroundColor: '#FAFAFA',
      },
    },
  },
  table: {
    '& .RaDatagrid-thead': {
      backgroundColor: '#FAFAFA',
    },
    '& .RaDatagrid-row': {
      transition: 'all 0.2s',
      '&:hover': {
        backgroundColor: '#F5F5F5',
      },
    },
  }
};