package ru.tvsamara.staff.service.fileService.loadSKD;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;

/**
 *
 * @author venia
 */

@XmlAccessorType(XmlAccessType.FIELD)
// Определение порядка
 public class Row {
    @XmlAttribute(name = "MSGTEXT")
    private String message;
    @XmlAttribute(name = "DATETIME")
    private String dateTime;
    @XmlAttribute(name = "DEVICENAME")
    private String deviceName;
    @XmlAttribute(name = "CARDNO")
    private String cardNo;
    @XmlAttribute(name = "PERSONNAME")
    private String lastName;
    @XmlAttribute(name = "FIRSTNAME")
    private String firstName;
    @XmlAttribute(name = "SECONDNAME")
    private String secondName;
    @XmlAttribute(name = "ORGNAME")
    private String orgName;
    @XmlAttribute(name = "DEPARTMENT")
    private String departament;
    @XmlAttribute(name = "TABLENO")
    private String tableNo;

    private final String filterPar1 = "Предоставление доступа на выход";
    private final String filterPar2 = "Предоставление доступа на вход";
    private final String filterPar3 = "Турникет Теледом";
    private final String filterPar4 = "Дверь АРВ Россия";
    private final String filterPar5 = "Пользователь";
    public boolean filterPredicat(){
        return !this.message.trim().equalsIgnoreCase(filterPar1) && !this.message.trim().equalsIgnoreCase(filterPar2)
                && !this.deviceName.trim().equalsIgnoreCase(filterPar3) && !this.deviceName.trim().equalsIgnoreCase(filterPar4) && ! this.deviceName.trim().equalsIgnoreCase(filterPar5);
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSecondName() {
        return secondName;
    }

    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public String getDepartament() {
        return departament;
    }

    public void setDepartament(String departament) {
        this.departament = departament;
    }

    public String getTableNo() {
        return tableNo;
    }

    public void setTableNo(String tableNo) {
        this.tableNo = tableNo;
    }


}
