// angular
import {Injectable} from 'angular2/core';

// libs
import * as _ from 'lodash';
import {TranslateService} from 'ng2-translate/ng2-translate';

// app
import {WindowService, ILang} from '../../core.framework/index';

@Injectable()
export class MultilingualService {
  
  // default supported languages
  // see main.ts bootstrap for example of how to provide different value
  public static SUPPORTED_LANGUAGES: Array<ILang> = [
    { code: 'en', title: 'English' }
  ];
  
  public static STATIC_FILES_LOADER: string = 'assets/i18n';
  
  // defaults to English: 'en'
  private _userLang: string = 'en';
  
  constructor(private translate: TranslateService, private win: WindowService) {
    // use navigator lang if available
    let userLang = win.navigator.language.split('-')[0];
    if (_.includes(_.map(MultilingualService.SUPPORTED_LANGUAGES, 'code'), userLang)) {
      // only if supported
      this._userLang = userLang;
    }

    // this will load translate json files
    translate.useStaticFilesLoader(MultilingualService.STATIC_FILES_LOADER);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(userLang);
  }
  
  public getLang(): string {
    return this._userLang;
  }
}