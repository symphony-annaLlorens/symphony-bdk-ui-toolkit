import React, { useRef, useState } from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../../misc/text';
import Tooltip from '../../misc/tooltip';
import {
  FloatInput,
  InputLabel,
  InputWrapper,
  StyledInput,
  TextArea,
  ToggleButtonText,
  Container,
} from './theme';
import { EyeIcon, ClosedEyeIcon } from '../../misc/icons';

const INPUT_TYPES = {
  PASSWORD: 'password',
  TEXTAREA: 'textarea',
  COPY: 'copy',
  TEXT: 'text',
};

export const ErrorWrapper = ({ children, error, errorMessage }) => (
  <div>
    {children}
    {error && (
      <Text type="danger" style={{ marginTop: '3px' }} size="small">
        {errorMessage}
      </Text>
    )}
  </div>
);

const InputAddons = (props) => {
  const {
    tooltip,
    disabled,
    showPassword,
    copyToClipBoard,
    setShowPassword,
    type,
    theme,
  } = props;

  const hasPassword = type === INPUT_TYPES.PASSWORD;
  const copyInput = type === INPUT_TYPES.COPY;

  if (!tooltip && !copyInput && !hasPassword) {
    return null;
  }

  return (
    <FloatInput>
      {(copyInput || hasPassword) && (
        <ToggleButtonText
          disabled={disabled}
          onClick={copyInput ? copyToClipBoard : setShowPassword}
        >
          {copyInput ? 'copy' : showPassword ? (<ClosedEyeIcon />) : (<EyeIcon />)}
        </ToggleButtonText>
      )}
      {tooltip && (
        <Tooltip
          size={14}
          color={theme.colors.grey_600}
          style={{ paddingRight: '8px' }}
        >
          {tooltip}
        </Tooltip>
      )}
    </FloatInput>
  );
};

const InputField = (props) => {
  const inputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    id,
    label,
    disabled,
    onChange,
    placeholder,
    value,
    inputState,
    copyInput,
    hasPasswordShow,
    type,
    errorMessage,
    tooltip,
    readOnly,
    size,
    theme,
    ...rest
  } = props;

  function copyToClipBoard() {
    inputRef.current.select();
    document.execCommand('copy');
  }

  if (type === INPUT_TYPES.TEXTAREA) {
    return (
      <ErrorWrapper error={inputState === 'error'} errorMessage={errorMessage}>
        {label && <label><InputLabel size="small">{label}</InputLabel></label>}
        <Container disabled={disabled} error={inputState === 'error'}>
          <InputWrapper>
            <TextArea
              {...rest}
              size={size}
              placeholder={placeholder}
              textArea
              disabled={disabled}
              id={id}
              onChange={onChange}
              value={value}
              ref={inputRef}
              rows="2"
              required
            />
          </InputWrapper>
        </Container>
      </ErrorWrapper>
    );
  }

  return (
    <ErrorWrapper error={inputState === 'error'} errorMessage={errorMessage}>
      {label && <label><InputLabel size="small">{label}</InputLabel></label>}
      <Container disabled={disabled} error={inputState === 'error'}>
        <InputWrapper>
          <InputAddons
            copyToClipBoard={copyToClipBoard}
            setShowPassword={() => setShowPassword(!showPassword)}
            showPassword={showPassword}
            theme={theme}
            {...props}
          />
          <StyledInput
            {...rest}
            size={size}
            readOnly={readOnly}
            disabled={disabled}
            id={id}
            onChange={readOnly ? null : onChange}
            value={value}
            ref={inputRef}
            type={showPassword ? INPUT_TYPES.TEXT : type}
            placeholder={placeholder}
            inputState={inputState}
            required
          />
        </InputWrapper>
      </Container>
    </ErrorWrapper>
  );
};

InputField.propTypes = {
  copyInput: PropTypes.bool,
  disabled: PropTypes.bool,
  hasPasswordShow: PropTypes.bool,
  id: PropTypes.string,
  inputState: PropTypes.oneOf(['initial', 'modified', 'error']),
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(INPUT_TYPES).map(l => INPUT_TYPES[l])),
  readOnly: PropTypes.bool,
  size: PropTypes.oneOf(['regular', 'large']),
};

InputField.defaultProps = {
  copyInput: false,
  disabled: false,
  hasPasswordShow: true,
  inputState: 'initial',
  type: INPUT_TYPES.TEXT,
  id: '',
  onChange: undefined,
  placeholder: 'Input here...',
  errorMessage: 'Something went wrong!',
  value: '',
  label: null,
  tooltip: null,
  readOnly: false,
  size: 'regular',
};

export default withTheme(InputField);