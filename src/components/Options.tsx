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
    <Container ref={ref} className={className}>
      <OptionsButton onClick={handleOpen}>
        <MoreVerticalIcon color="#fff" />
      </OptionsButton>
      {isOpen && (
        <Menu>
          {options.map((option) => (
            <span onClick={(e) => [e.stopPropagation(), option.onClick()]}>
              {option.label}
            </span>
          ))}
        </Menu>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

const OptionsButton = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  --size: 4rem;
  height: var(--size);
  width: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Menu = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: var(--border-radius);
  position: absolute;
  top: 4.5rem;
  right: 1rem;
  white-space: nowrap;
`;

export default Options;
