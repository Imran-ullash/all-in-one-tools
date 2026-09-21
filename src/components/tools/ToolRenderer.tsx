'use client';

import React from 'react';
import AgeCalculator from './calculators/AgeCalculator';
import BmiCalculator from './calculators/BmiCalculator';
import PercentageCalculator from './calculators/PercentageCalculator';
import LoanCalculator from './calculators/LoanCalculator';
import DateCalculator from './calculators/DateCalculator';

import WordCounter from './text/WordCounter';
import CharacterCounter from './text/CharacterCounter';
import CaseConverter from './text/CaseConverter';
import RemoveDuplicateLines from './text/RemoveDuplicateLines';

import ImageCompressor from './image/ImageCompressor';
import ImageResizer from './image/ImageResizer';
import JpgToPng from './image/JpgToPng';
import PngToJpg from './image/PngToJpg';

import JsonFormatter from './dev/JsonFormatter';
import JsonValidator from './dev/JsonValidator';
import Base64Encoder from './dev/Base64Encoder';
import Base64Decoder from './dev/Base64Decoder';
import UuidGenerator from './dev/UuidGenerator';

interface ToolRendererProps {
  toolId: string;
}

export default function ToolRenderer({ toolId }: ToolRendererProps) {
  switch (toolId) {
    case 'age-calculator':
      return <AgeCalculator />;
    case 'bmi-calculator':
      return <BmiCalculator />;
    case 'percentage-calculator':
      return <PercentageCalculator />;
    case 'loan-calculator':
      return <LoanCalculator />;
    case 'date-calculator':
      return <DateCalculator />;

    case 'word-counter':
      return <WordCounter />;
    case 'character-counter':
      return <CharacterCounter />;
    case 'case-converter':
      return <CaseConverter />;
    case 'remove-duplicate-lines':
      return <RemoveDuplicateLines />;

    case 'image-compressor':
      return <ImageCompressor />;
    case 'image-resizer':
      return <ImageResizer />;
    case 'jpg-to-png':
      return <JpgToPng />;
    case 'png-to-jpg':
      return <PngToJpg />;

    case 'json-formatter':
      return <JsonFormatter />;
    case 'json-validator':
      return <JsonValidator />;
    case 'base64-encoder':
      return <Base64Encoder />;
    case 'base64-decoder':
      return <Base64Decoder />;
    case 'uuid-generator':
      return <UuidGenerator />;

    default:
      return <div>Tool not found</div>;
  }
}
