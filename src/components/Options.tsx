import { useRef, useState } from 'react';
import styled from 'styled-components';
import { MoreVertical as MoreVerticalIcon } from 'react-feather';
import { useOutsideClick } from '@/hooks';

type Props = {
  className?: string;
  options: {
    label: string;
    onClick: () => void;
  }[];
};

const Options = ({ className, options }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useOutsideClick(ref, () => {
    setIsOpen(false);
  });

  function handleOpen(e) {
    e.stopPropagation();

    setIsOpen(!isOpen);
  }

  return (
    <>
      <Container ref={ref} className={className}>
        <OptionsButton onClick={handleOpen}>
          <MoreVerticalIcon color="#fff" />
        </OptionsButton>
      </Container>
      {isOpen && (
        <Menu>
          {options.map((option, index) => (
            <MenuItem
              key={index}
              onClick={(e) => [e.stopPropagation(), option.onClick()]}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};

const Container = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
`;

const OptionsButton = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  --size: 4rem;
  height: var(--size);
  width: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const Menu = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: var(--border-radius);
  position: absolute;
  top: 4.5rem;
  right: 1rem;
`;

const MenuItem = styled.span`
  display: inline-block;
  padding: 1rem;
  white-space: nowrap;
`;

export default Options;
