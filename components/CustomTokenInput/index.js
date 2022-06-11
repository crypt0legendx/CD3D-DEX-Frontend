import React, {useCallback, useRef} from 'react';
import styles from '../../styles/buyToke.module.css';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { FormHelperText } from '@mui/material';

const CustomTokenInput = (props) => {
  const { value, handleChange, maxValue, errMsg, tokenName, tokenImage, maxButton } = props;

  const inputRef = useRef();

  const handleMax = useCallback(() => {
    inputRef.current.value = maxValue;
    handleChange({target: {value: maxValue}});
  }, [maxValue, handleChange]);

  return (
    <div className={styles.bidPriceOuter}>
      <div className={styles.bidPriceInput}>
        <input ref={inputRef} value={value} type='number' placeholder='0' min='0' onChange={handleChange} />
        <Typography variant='subtitle2' gutterBottom component='div'>
          {maxButton && <text className={styles.maxButton} onClick={handleMax}>MAX</text>}
          {tokenName}
          {tokenImage && <Image src={tokenImage} alt={`Picture of`} />}
        </Typography>
      </div>
      {errMsg && <FormHelperText error>{errMsg}</FormHelperText>}
    </div>
  );
};

export default CustomTokenInput;
