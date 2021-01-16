import {HttpErrorResponse} from '@angular/common/http';

/**
 * return the error message for post
 * @param error error response
 */
export function getPostErrorMessage(error: HttpErrorResponse): string {
  switch (error.status) {
    case 404: {
      return '포스트가 존재하지 않습니다';
    }

    case 401: {
      return '권한이 없습니다';
    }

    default: {
      return error.error.error.message;
    }
  }
}
