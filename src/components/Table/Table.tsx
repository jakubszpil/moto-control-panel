import { useEffect, useRef, useState } from "react";
import { Form, Table, TableProps, Button, Container } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Device, selectDevice, unselectDevice } from "../../features/devmanager/devmanagerSlice";
import useFilteredArray from "../../hooks/useFilteredArray/useFilteredArray";
import { useSortedArrayByKeys } from "../../hooks/useSortedArray/useSortedArray";
import useURLSearchParams from "../../hooks/useURLSearchParams/useURLSearchParams";
import Loader from "../Loader/Loader";

export default (props: TableProps) => {
  const { device, devices } = useAppSelector((state) => state.devmanager);
  const params = useURLSearchParams();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const filterInput = useRef<HTMLInputElement>(null);
  const filterCheckbox = useRef<HTMLInputElement>(null);
  const filterControl = useRef<HTMLSelectElement & { value: keyof Device }>(null);

  const [sortingKey, setSortingKey] = useState<keyof Device>(params.sortBy || "Id");
  const [direction, setDirection] = useState<1 | -1>(1);
  const [filterQuery, setFilterQuery] = useState<string | undefined>("");
  const [filterKey, setFilterKey] = useState<keyof Device | undefined>("Id");
  const [filteredByKey, setFilteredByKey] = useState<boolean | undefined>(false);

  const headers: any[] = devices.length ? Object.keys(devices[0]).filter((k) => k !== "Position") : [];
  const sortedArray = useSortedArrayByKeys(devices, sortingKey, direction) || [];
  const filteredArray = useFilteredArray<Device>(sortedArray, filterQuery, filteredByKey, filterKey) || [];

  const handleFilter = () => {
    const filterByQuery = filterInput.current?.value;
    const filterByKey = filterControl.current?.value;
    const isFilteredByKey = filterCheckbox.current?.checked;

    setFilterQuery(filterByQuery);
    setFilterKey(filterByKey);
    setFilteredByKey(isFilteredByKey);
  };

  const handleReset = () => {
    setFilterQuery("");
    setFilterKey("Id");
    setFilteredByKey(false);
  };

  useEffect(() => {
    if (sortingKey === params?.sortBy) setDirection((p) => (p === -1 ? 1 : -1));
    else if (headers.findIndex((h) => h === params?.sortBy) !== -1) {
      setSortingKey(params?.sortBy);
      setDirection(1);
    }
  }, [params]);

  if (!devices.length) return <Loader />;
  return (
    <Container fluid="xl" className="min-vh-100">
      <Form onChange={handleFilter} onReset={handleReset} inline className="py-4">
        <Form.Label htmlFor="inlineFormInputName2" srOnly>
          Filter by:
        </Form.Label>
        <Form.Control ref={filterInput} id="inlineFormInputName2" placeholder="Filter by:" />
        <Form.Check
          ref={filterCheckbox}
          checked={filteredByKey}
          readOnly
          type="checkbox"
          className="mt-3 mt-sm-0 ml-sm-1  ml-md-3"
          id="inlineFormCheck"
          label="Filter by key"
        />
        <Form.Label htmlFor="inlineSwitch" srOnly>
          Select filter key
        </Form.Label>
        <Form.Control
          disabled={!filteredByKey}
          ref={filterControl}
          className="mt-3 mt-sm-0 ml-sm-1  ml-md-3"
          as="select"
          id="inlineSwitch"
          custom
        >
          {headers.map((header, headerKey) => (
            <option value={header} key={headerKey}>
              By {header}
            </option>
          ))}
        </Form.Control>
        <Button className="mt-3 mt-sm-0 ml-sm-1  ml-md-3" type="reset">
          Reset
        </Button>
        {device && (
          <Button
            className="btn-danger mt-3 mt-sm-0 ml-sm-1  ml-md-3"
            type="button"
            onClick={() => dispatch(unselectDevice())}
          >
            Unselect device
          </Button>
        )}
      </Form>
      <div className="table-container">
        <Table {...props} className="no-wrap">
          <thead className="bg-primary">
            <tr>
              {headers.map((header, headerKey) => (
                <th key={headerKey}>
                  <Link className="text-light" to={{ pathname: location.pathname, search: `?sortBy=${header}` }}>
                    {header}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          {filteredArray.length > 0 && (
            <tbody>
              {filteredArray.map((item) => {
                return (
                  <tr key={item.Id} className={item.Id === device?.Id ? "bg-secondary text-white row-selected" : undefined}>
                    {headers.map((header: any, headerKey) => {
                      const pk: keyof Device = header;
                      const handleSelect = () => dispatch(selectDevice(item));
                      return (
                        <td key={headerKey} onClick={handleSelect}>
                          {item[pk]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </Table>
        {filteredArray.length < 1 && <div className="text-center p-4">The specified items were not found</div>}
      </div>
    </Container>
  );
};
