package ru.tvsamara.staff.service.fileService.loadSKD;
import java.util.LinkedList;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
/**
 *
 * @author venia
 */
@XmlRootElement(name = "REPORT")
@XmlAccessorType(XmlAccessType.FIELD)
 class RowsList {
    @XmlElementWrapper(name="ROWS")
    @XmlElement(name="ROW")
    private LinkedList<Row> rows = new LinkedList<>();

    public LinkedList<Row> getListEvent() {
        return rows;
    }

    public void setListEvent(LinkedList<Row> listEvent) {
        this.rows = listEvent;
    }

}
