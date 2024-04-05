import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Oiseau } from '../../../../common/tables/Oiseau';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-oiseau',
  templateUrl: './oiseau.component.html',
  styleUrls: ['./oiseau.component.css']
})
export class OiseauComponent implements OnInit {
  @ViewChild('newNomScientifique') newNomScientifique: ElementRef;
  @ViewChild('newNomCommun') newNomCommun: ElementRef;
  @ViewChild('newStatutSpeces') newStatutSpeces: ElementRef;
  @ViewChild('newNomScientifiqueComsommer') newNomScientifiqueComsommer: ElementRef;
  oiseaux: Oiseau[] = [];

  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.getBirds();
  }

  public refresh(): void {
    this.getBirds();
    this.newNomScientifique.nativeElement.innerText = 'Nom scientifique';
    this.newNomCommun.nativeElement.innerText = 'Nom commun';
    this.newStatutSpeces.nativeElement.value = '';
    this.newNomScientifiqueComsommer.nativeElement.innerText = '';
  }

  public getBirds(): void {
    this.communicationService.getBirds().subscribe((oiseaux: Oiseau[]) => {
      this.oiseaux = oiseaux;
    });
  }

  public deleteBird(nomscientifique: string): void {
    this.communicationService.deleteBird(nomscientifique).subscribe((res: number) => {
      this.getBirds();
    });
  }

  public addBird(): void {
    const oiseau: any = {
      nomscientifique: this.newNomScientifique.nativeElement.innerText,
      nomcommun: this.newNomCommun.nativeElement.innerText,
      statutspeces: this.newStatutSpeces.nativeElement.value,
      nomscientifiquecomsommer: this.newNomScientifiqueComsommer.nativeElement.innerText === '' ? null : this.newNomScientifiqueComsommer.nativeElement.innerText,
    };
    this.communicationService.addBird(oiseau).subscribe((res: number) => {
      if (res > 0) {
        this.communicationService.filter('update');
      }
      this.refresh();
    });
  }

  public changeNomCommun(event: any, i: number): void {
    const editField = event.target.textContent;
    if (editField.trim() !== '') {
      this.oiseaux[i].nomcommun = editField;
    }
  }
  
  public changeStatutSpeces(event: any, i: number): void {
    const editField = event.target.value;
    if (editField.trim() !== '') {
      this.oiseaux[i].statutspeces = editField;
    }
  }
  
  public changeNomScientifiqueComsommer(event: any, i: number): void {
    const editField = event.target.textContent;
    if (editField.trim() !== '') {
      this.oiseaux[i].nomscientifiquecomsommer = editField;
    }
  }

  public updateBird(i: number): void {
    this.communicationService.updateBird(this.oiseaux[i]).subscribe((res: number) => {
      this.refresh();
    });
  }

}
