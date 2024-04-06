import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Oiseau } from "../../../common/tables/Oiseau";
import { InformationModalComponent } from "./information-modal/information-modal.component";
import { MatDialog } from "@angular/material/dialog";

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(
    private http: HttpClient,
    private dialog: MatDialog,
  ) { }

  private _listners: any = new Subject<any>();

  public listen(): Observable<any> {
    return this._listners.asObservable();
  }

  public filter(filterBy: string): void {
    this._listners.next(filterBy);
  }

  public getBirds(): Observable<Oiseau[]> {
    return this.http
      .get<Oiseau[]>(this.BASE_URL + "/birds")
      .pipe(catchError(this.handleError<Oiseau[]>("getBirds")));
  }

  public deleteBird(nomscientifique: string): Observable<number> {
    return this.http
      .delete<number>(this.BASE_URL + "/birds/" + nomscientifique)
      .pipe(catchError(this.handleError<number>("deleteBird")));
  }

  public addBird(oiseau: Oiseau): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/birds/add", oiseau)
      .pipe(catchError(this.handleError<number>("addBird")));
  }

  public updateBird(oiseau: Oiseau): Observable<number> {
    return this.http
      .put<number>(this.BASE_URL + "/birds/update", oiseau)
      .pipe(catchError(this.handleError<number>("updateBird")));
  }

  private handleError<T>(
    request: string,
    result?: T
  ): (error: any) => Observable<T> {
    return (error: HttpErrorResponse): Observable<T> => {
      this.dialog.open(InformationModalComponent, {
        data: error.error,
      });
      return of(result as T);
    };
  }
}


