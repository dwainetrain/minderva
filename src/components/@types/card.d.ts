import {AlertStatus} from "@chakra-ui/react";
import React from "react";
import {User} from "firebase/auth";

type UserRouteModel = {
  user: UserWithActions;
  cardCollection?: any[];
  handleMessage?: HandleMessage;
  userLangPrefs?: UserLangPrefs;
  loading?: {};
  cardsLoaded?: boolean;
};

export interface CardAction {
  handleMessage: HandleMessage;
  userLangPrefs?: UserLangPrefs;
  mode: "add" | "update" | "delete" | "";
  user: UserWithActions;
  cardId?: string;
}

export interface UserLangPrefs {
  targetCode: string;
  originCode: string;
}

export interface UserWithActions extends User {
  uid: string;
  userLangPrefs?: UserLangPrefs;
  handleMessage?: HandleMessage;
}

type HandleMessage = (message: string, status?: AlertStatus) => void;

export interface Card {
  fromLanguage: string;
  toLanguage: string;
  handleToLanguageSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleManualGenerateAudio?: React.MouseEventHandler<HTMLButtonElement>;
  loadingTranslation?: boolean;
  loadingAudio: string;
  handleTranslate?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleGenerateChecked?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  manual?: boolean;
  handleFromLanguageSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  front: string;
  handleFront?: React.ChangeEventHandler<HTMLInputElement>;
  frontAudio?: string;
  handleBack?: React.ChangeEventHandler<HTMLInputElement>;
  backAudio?: string;
  back?: string;
}
