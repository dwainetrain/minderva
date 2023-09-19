import {AlertStatus} from "@chakra-ui/react";
import React from "react";
import {UserInfo} from "firebase/auth";
export {UserInfo} from "firebase/auth";

export type UserRouteModel = {
  user?: UserInfo;
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

declare module "firebase/auth" {
  export interface UserInfo {
    userLangPrefs?: UserLangPrefs;
    handleMessage?: HandleMessage;
  }
}

export interface UserWithActions extends UserInfo {
  userLangPrefs?: UserLangPrefs;
  handleMessage?: HandleMessage;
}

export type HandleMessage = (message: string, status?: AlertStatus) => void;

export interface Card {
  fromLanguage: string;
  toLanguage: string;
  handleToLanguageSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleManualGenerateAudio?: React.MouseEventHandler<HTMLButtonElement>;
  loadingTranslation?: boolean;
  loadingAudio: string;
  handleTranslate?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleGenerateChecked?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  manual?: boolean;
  handleFromLanguageSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  front: string;
  handleFront?: React.ChangeEventHandler<HTMLInputElement>;
  frontAudio?: string;
  handleBack?: React.ChangeEventHandler<HTMLInputElement>;
  backAudio?: string;
  back?: string;
}
