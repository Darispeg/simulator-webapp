import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
    selector: 'maps',
    templateUrl: './event-map.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'maps'
})
export class EventMapComponent implements OnInit, OnDestroy
{
  ngOnDestroy(): void {

  }

  ngOnInit(): void {

  }
    // google maps zoom level
    zoom: number = 8;

    // initial center position for the map
    lat: number = 51.673858;
    lng: number = 7.815982;

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
      }
      
      mapClicked($event: MouseEvent) {
        this.markers.push({
          lat: 100,
          lng: 100,
          draggable: true
        });
      }
      
      markerDragEnd(m: marker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
      }
      
      markers: marker[] = [
          {
              lat: 51.673858,
              lng: 7.815982,
              label: 'A',
              draggable: true
          },
          {
              lat: 51.373858,
              lng: 7.215982,
              label: 'B',
              draggable: false
          },
          {
              lat: 51.723858,
              lng: 7.895982,
              label: 'C',
              draggable: true
          }
      ]
}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}