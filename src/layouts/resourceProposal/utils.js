export const getStatus = (code) => {
  if(code === '0') return 'Pending'
  else if(code === '1') return 'Successful'
  else if(code === '2') return 'Waiting for Deadline'
  else if(code === '3') return 'Failed'
  else return 'No'
}